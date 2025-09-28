import { NextRequest, NextResponse } from 'next/server'
import { profileService } from '@/backend/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const bio = formData.get('bio') as string
    const birthDate = formData.get('birthDate') as string
    const birthTime = formData.get('birthTime') as string
    const profilePhoto = formData.get('profilePhoto') as File | null
    const userId = formData.get('userId') as string || `user_${Date.now()}` // Generate temp user ID

    // Validate required fields
    if (!bio || !birthDate || !birthTime) {
      return NextResponse.json(
        { error: 'Missing required fields: bio, birthDate, and birthTime are required' },
        { status: 400 }
      )
    }

    let profilePhotoUrl = null

    // Upload profile photo if provided
    if (profilePhoto && profilePhoto.size > 0) {
      try {
        profilePhotoUrl = await profileService.uploadProfilePhoto(profilePhoto, userId)
      } catch (uploadError) {
        console.error('Photo upload failed:', uploadError)
        // Continue without photo if upload fails
      }
    }

    // Create profile data
    const profileData = {
      user_id: userId,
      bio,
      birth_date: birthDate,
      birth_time: birthTime,
      profile_photo_url: profilePhotoUrl
    }

    // Save to database
    const savedProfile = await profileService.createProfile(profileData)

    return NextResponse.json({
      success: true,
      message: 'Profile created successfully',
      profile: savedProfile
    })

  } catch (error) {
    console.error('Profile creation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to create profile',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const profile = await profileService.getProfile(userId)

    return NextResponse.json({
      success: true,
      profile
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch profile',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
