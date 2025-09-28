// Simple JavaScript Supabase client for profile operations
// No TypeScript dependencies - pure JavaScript

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Profile operations using pure JavaScript
export const profileOperations = {
  // Create a new profile
  async createProfile(profileData) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([profileData])
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to create profile: ${error.message}`)
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get profile by ID
  async getProfile(profileId) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', profileId)
        .single()

      if (error) {
        throw new Error(`Failed to get profile: ${error.message}`)
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get all profiles
  async getAllProfiles() {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Failed to get profiles: ${error.message}`)
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Upload profile photo to avatars bucket
  async uploadPhoto(file, userId) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `avatar-${userId}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload file to avatars bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      return { success: true, url: data.publicUrl }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Complete profile creation with photo upload
  async createCompleteProfile(formData) {
    try {
      // Generate unique profile ID for photo naming
      const profileId = `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      let profilePhotoUrl = null

      // Upload photo if provided
      if (formData.profilePhoto) {
        const photoResult = await this.uploadPhoto(formData.profilePhoto, profileId)
        if (photoResult.success) {
          profilePhotoUrl = photoResult.url
        } else {
          console.warn('Photo upload failed:', photoResult.error)
        }
      }

      // Prepare profile data matching user_profiles table structure
      const profileData = {
        name: 'Dummy User', // Dummy name value as requested
        bio: formData.bio,
        date_of_birth: formData.dateOfBirth,
        birth_time: formData.birthTime,
        image: profilePhotoUrl
      }

      // Save to database
      const result = await this.createProfile(profileData)
      
      if (result.success) {
        return { 
          success: true, 
          message: 'Profile created successfully!',
          profile: result.data 
        }
      } else {
        return { 
          success: false, 
          error: result.error 
        }
      }

    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      }
    }
  }
}

// Export the Supabase client for direct use if needed
export { supabase }
