# Backend Setup with Supabase

This guide will help you set up Supabase for your Cosmic Connections app.

## 🚀 Supabase Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in your project details:
   - **Name**: `cosmic-connections`
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

1. Create a `.env.local` file in your project root:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace the values with your actual Supabase credentials

### 4. Create Database Tables

Run this SQL in your Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  bio TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  profile_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own profiles
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (true);

-- Allow users to view all profiles (for matching)
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

-- Allow users to update their own profiles
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (true);
```

### 5. Set Up Storage for Profile Photos

1. In Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Name it `profile-photos`
4. Make it **Public** (so profile photos can be displayed)
5. Click "Create bucket"

### 6. Configure Storage Policies

Run this SQL for storage policies:

```sql
-- Allow anyone to upload profile photos
CREATE POLICY "Anyone can upload profile photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-photos');

-- Allow anyone to view profile photos
CREATE POLICY "Anyone can view profile photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-photos');

-- Allow users to update their own photos
CREATE POLICY "Users can update their own photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'profile-photos');
```

## 🧪 Testing the Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/profile-setup`

3. Fill out the form and submit it

4. Check your Supabase dashboard:
   - Go to **Table Editor** → **profiles** to see the saved data
   - Go to **Storage** → **profile-photos** to see uploaded images

## 📁 File Structure

```
backend/
├── supabase.ts          # Supabase client and database operations
└── README.md           # This setup guide

app/api/
└── profile/
    └── route.ts        # API endpoint for profile operations
```

## 🔧 Available Operations

- **Create Profile**: `POST /api/profile`
- **Get Profile**: `GET /api/profile?userId=user_id`
- **Upload Photos**: Handled automatically during profile creation

## 🛠️ Troubleshooting

### Common Issues:

1. **Environment variables not loading**
   - Make sure `.env.local` is in the project root
   - Restart your development server after adding env vars

2. **Database connection errors**
   - Verify your Supabase URL and key are correct
   - Check if your Supabase project is active

3. **File upload errors**
   - Ensure the `profile-photos` bucket exists
   - Check storage policies are set correctly

4. **RLS (Row Level Security) errors**
   - Make sure RLS policies are created
   - Verify policies allow the operations you need

### Need Help?

- Check the [Supabase Documentation](https://supabase.com/docs)
- Look at the browser console for error messages
- Check the Supabase dashboard logs
