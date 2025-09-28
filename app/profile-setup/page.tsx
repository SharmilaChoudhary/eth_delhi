'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Camera, Calendar, Clock, User, FileText } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ProfileSetup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    bio: '',
    dateOfBirth: '',
    birthTime: '',
    profilePhoto: null as File | null
  })
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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

      // Prepare profile data for database
      const profileData = {
        name: 'Dummy User', // Dummy name value as requested
        bio: formData.bio,
        date_of_birth: formData.dateOfBirth,
        birth_time: formData.birthTime,
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

          {/* Birth Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-cosmic-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Birth Details</h2>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              For astrological compatibility calculations
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Date *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cosmic-500 focus:border-transparent text-white bg-gray-800"
                  required
                />
              </div>

              {/* Birth Time */}
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
                    className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cosmic-500 focus:border-transparent text-white bg-gray-800"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting || !formData.bio || !formData.dateOfBirth || !formData.birthTime}
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
