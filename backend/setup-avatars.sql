-- Setup script for avatars storage bucket
-- Run this in your Supabase SQL Editor

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for avatars bucket
CREATE POLICY "Allow all storage operations on avatars" 
ON storage.objects FOR ALL 
USING (bucket_id = 'avatars');

-- Allow anyone to view avatars (public access)
CREATE POLICY "Allow public access to avatars" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

-- Allow anyone to upload avatars
CREATE POLICY "Allow public upload to avatars" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars');

-- Allow anyone to update avatars
CREATE POLICY "Allow public update to avatars" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatars');

-- Allow anyone to delete avatars
CREATE POLICY "Allow public delete from avatars" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'avatars');
