import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id?: string
  name?: string
  age?: number
  bio: string
  gender?: string
  date_of_birth: string
  nationality?: string
  image?: string
  birth_time: string
  created_at?: string
}

// Profile operations
export const profileService = {
  // Create a new profile
  async createProfile(profileData: Omit<Profile, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profileData])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`)
    }

    return data
  },

  // Get profile by id
  async getProfile(profileId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', profileId)
      .single()

    if (error) {
      throw new Error(`Failed to get profile: ${error.message}`)
    }

    return data
  },

  // Update profile
  async updateProfile(profileId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', profileId)
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
    const fileName = `avatar-${userId}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) {
      throw new Error(`Failed to upload photo: ${uploadError.message}`)
    }

    // Get public URL
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return data.publicUrl
  }
}
