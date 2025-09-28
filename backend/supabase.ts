import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id?: string
  user_id?: string
  bio: string
  birth_date: string
  birth_time: string
  profile_photo_url?: string
  created_at?: string
  updated_at?: string
}

// Profile operations
export const profileService = {
  // Create a new profile
  async createProfile(profileData: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`)
    }

    return data
  },

  // Get profile by user_id
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new Error(`Failed to get profile: ${error.message}`)
    }

    return data
  },

  // Update profile
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }

    return data
  },

  // Upload profile photo
  async uploadProfilePhoto(file: File, userId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `profile-photos/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, file)

    if (uploadError) {
      throw new Error(`Failed to upload photo: ${uploadError.message}`)
    }

    // Get public URL
    const { data } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath)

    return data.publicUrl
  }
}
