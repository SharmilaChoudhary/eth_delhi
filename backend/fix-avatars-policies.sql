-- Fix RLS policies for avatars storage bucket
-- Run this in your Supabase SQL Editor to fix the upload error

-- First, check if the avatars bucket exists, if not create it
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow all storage operations on avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete from avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow all storage operations" ON storage.objects;

-- Create comprehensive policies for avatars bucket
-- Allow anyone to upload to avatars bucket
CREATE POLICY "Enable upload for avatars" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars');

-- Allow anyone to view avatars (public access)
CREATE POLICY "Enable public access for avatars" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

-- Allow anyone to update avatars
CREATE POLICY "Enable update for avatars" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatars');

-- Allow anyone to delete avatars
CREATE POLICY "Enable delete for avatars" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'avatars');

-- Alternative: If the above doesn't work, try this more permissive policy
-- CREATE POLICY "Allow all operations on avatars" 
-- ON storage.objects FOR ALL 
-- USING (bucket_id = 'avatars');
