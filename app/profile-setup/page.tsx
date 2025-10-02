'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Camera, Calendar, Clock, User, FileText, Star, Sparkles, Shield, CheckCircle, Wallet } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { calculateZodiacSign, getZodiacInfo, validateBirthDate, calculateAge } from '@/utils/zodiac'
import { ZodiacSign } from '@/types'
import { fetchVerifiedUserDataFromSelf, getUserIdentifierFromSelf, VerifiedUserData } from '@/utils/contract'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ProfileSetup() {
  const router = useRouter()
  const [verifiedData, setVerifiedData] = useState<VerifiedUserData | null>(null)
  const [formData, setFormData] = useState({
    bio: '',
    birthTime: '',
    profilePhoto: null as File | null
  })
  const [zodiacInfo, setZodiacInfo] = useState<any>(null)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load verified data from smart contract on component mount
  useEffect(() => {
    const loadVerifiedData = async () => {
      try {
        // Get user identifier from Self verification (if available)
        const userIdentifier = getUserIdentifierFromSelf()
        console.log('Self user identifier:', userIdentifier)

        // Fetch verified data from smart contract
        const contractData = await fetchVerifiedUserDataFromSelf(userIdentifier || undefined)
        if (contractData) {
          setVerifiedData(contractData)
          
          // Calculate zodiac sign from verified birth date
          if (contractData.date_of_birth) {
            const zodiac = calculateZodiacSign(contractData.date_of_birth)
            const info = getZodiacInfo(zodiac)
            setZodiacInfo(info)
          }
        } else {
          console.log('No verified data found in contract')
        }
      } catch (error) {
        console.error('Error loading verified data from contract:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVerifiedData()
  }, [])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, profilePhoto: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Generate a unique user ID
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      let profilePhotoUrl = null

      // Upload profile photo to Supabase Storage avatars bucket if provided
      if (formData.profilePhoto) {
        try {
          const fileExt = formData.profilePhoto.name.split('.').pop()
          const fileName = `avatar-${userId}-${Date.now()}.${fileExt}`
          const filePath = `avatars/${fileName}`

          // Upload file to Supabase Storage avatars bucket
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, formData.profilePhoto)

          if (uploadError) {
            console.warn('Avatar upload failed:', uploadError.message)
            // Continue without photo if upload fails
          } else {
            // Get public URL for the uploaded file
            const { data } = supabase.storage
              .from('avatars')
              .getPublicUrl(filePath)
            
            profilePhotoUrl = data.publicUrl
            console.log('Avatar uploaded successfully:', profilePhotoUrl)
          }
        } catch (uploadError) {
          console.warn('Avatar upload error:', uploadError)
          // Continue without photo
        }
      }

      // Use verified data from smart contract
      if (!verifiedData) {
        throw new Error('No verified data found. Please complete identity verification first.')
      }

      // Prepare profile data for database using verified data
      const profileData = {
        name: verifiedData.name,
        bio: formData.bio,
        date_of_birth: verifiedData.date_of_birth,
        birth_time: formData.birthTime,
        age: verifiedData.age,
        nationality: verifiedData.nationality,
        gender: verifiedData.gender,
        image: profilePhotoUrl
      }

      console.log('Saving profile data:', profileData)

      // Insert profile data into Supabase database
      const { data: savedProfile, error: dbError } = await supabase
        .from('user_profiles')
        .insert([profileData])
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        throw new Error(`Database error: ${dbError.message}`)
      }

      // Success!
      console.log('Profile saved to Supabase:', savedProfile)
      
      // Store profile completion status
      localStorage.setItem('profileCompleted', 'true')
      localStorage.setItem('userProfile', JSON.stringify(savedProfile))
      
      // Show success state
      setIsSuccess(true)
      
      // Redirect to matching page after a short delay
      setTimeout(() => {
        router.push('/matching')
      }, 3000)
      
    } catch (error) {
      console.error('Error saving profile:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to save profile'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while fetching verified data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Verified Data...</h2>
          <p className="text-gray-600">Retrieving your verified information from the blockchain</p>
        </div>
      </div>
    )
  }

  // Show verification required if no verified data
  if (!verifiedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Verification Required</h2>
          
          <p className="text-gray-600 mb-6">
            No verification data found in the smart contract. Please complete identity verification with Self first.
          </p>
          
          <button
            onClick={() => router.push('/signin')}
            className="w-full px-6 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Complete Verification
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {isSuccess ? (
          // Success Screen
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-white">✓</span>
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Profile Created Successfully!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your cosmic profile is ready. Redirecting you to find your matches...
            </p>
            <div className="w-full h-2 bg-gradient-to-r from-cosmic-500 via-accent-500 to-green-500 rounded-full shadow-md mb-4">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-500">Redirecting to matching page...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-3">
                Create Your Cosmic Profile
              </h1>
              <p className="text-gray-600 text-base">
                Tell us about yourself and let the stars guide your connections
              </p>
            </div>

        {/* Verified Data Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200 mb-6">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Verified Information</h2>
            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <label className="text-sm font-medium text-green-800">Full Name</label>
              <p className="text-green-900 font-semibold">{verifiedData.name}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <label className="text-sm font-medium text-green-800">Nationality</label>
              <p className="text-green-900 font-semibold">{verifiedData.nationality}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <label className="text-sm font-medium text-green-800">Date of Birth</label>
              <p className="text-green-900 font-semibold">{new Date(verifiedData.date_of_birth).toLocaleDateString()}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <label className="text-sm font-medium text-green-800">Age</label>
              <p className="text-green-900 font-semibold">{verifiedData.age} years old</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <label className="text-sm font-medium text-green-800">Gender</label>
              <p className="text-green-900 font-semibold">{verifiedData.gender}</p>
            </div>
            
            {zodiacInfo && (
              <div className="bg-gradient-to-br from-cosmic-50 to-accent-50 rounded-lg p-4">
                <label className="text-sm font-medium text-cosmic-800">Zodiac Sign</label>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{zodiacInfo.symbol}</span>
                  <div>
                    <p className="text-cosmic-900 font-semibold">{zodiacInfo.sign}</p>
                    <p className="text-xs text-cosmic-600">{zodiacInfo.element} • {zodiacInfo.quality}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="text-sm text-green-800 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              This information has been verified on-chain through Self Protocol
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Camera className="w-5 h-5 text-cosmic-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Profile Photo</h2>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-100 to-accent-100 border-4 border-white shadow-lg overflow-hidden">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-cosmic-500 hover:bg-cosmic-600 text-white p-1.5 rounded-full cursor-pointer transition-colors shadow-lg">
                  <Upload className="w-3 h-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Upload a clear photo of yourself
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-cosmic-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">About You</h2>
            </div>
            
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself, your interests, what you're looking for..."
              className="w-full h-24 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cosmic-500 focus:border-transparent resize-none text-white bg-gray-800 placeholder-gray-400"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                Share your personality and interests
              </p>
              <span className="text-xs text-gray-400">
                {formData.bio.length}/500
              </span>
            </div>
          </div>

          {/* Birth Time Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-cosmic-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Birth Time</h2>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Required for accurate horoscope and compatibility calculations
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleInputChange}
                  placeholder="Select birth time"
                  className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cosmic-500 focus:border-transparent text-gray-800 bg-white"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will be used along with your verified birth date for astrological calculations
              </p>
            </div>

            {/* Zodiac Display */}
            {zodiacInfo && (
              <div className="bg-gradient-to-br from-cosmic-50 to-accent-50 rounded-xl p-4 border border-cosmic-200 mt-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{zodiacInfo.symbol}</span>
                  <div>
                    <p className="font-semibold text-cosmic-700">{zodiacInfo.sign}</p>
                    <p className="text-sm text-gray-600">{zodiacInfo.element} • {zodiacInfo.quality}</p>
                    <p className="text-xs text-gray-500">{zodiacInfo.dateRange}</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-cosmic-500 ml-auto" />
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Key Traits:</p>
                  <div className="flex flex-wrap gap-1">
                    {zodiacInfo.traits?.slice(0, 3).map((trait: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/80 text-cosmic-600 text-xs rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting || !formData.bio || !formData.birthTime || !verifiedData}
              className="bg-gradient-to-r from-cosmic-500 to-accent-500 hover:from-cosmic-600 hover:to-accent-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Profile...
                </div>
              ) : (
                'Complete Setup'
              )}
            </button>
          </div>
        </form>

            {/* Footer Note */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Your information is secure and used only for cosmic connections
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
