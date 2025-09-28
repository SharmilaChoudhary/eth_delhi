-- Simple and permissive policy for avatars bucket
-- This should fix the RLS error immediately

-- Create the avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop all existing policies on storage.objects to start fresh
DROP POLICY IF EXISTS "Enable upload for avatars" ON storage.objects;
DROP POLICY IF EXISTS "Enable public access for avatars" ON storage.objects;
DROP POLICY IF EXISTS "Enable update for avatars" ON storage.objects;
DROP POLICY IF EXISTS "Enable delete for avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations on avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow all storage operations" ON storage.objects;
DROP POLICY IF EXISTS "Allow all storage operations on avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete from avatars" ON storage.objects;

-- Create a single, simple policy that allows all operations on avatars bucket
CREATE POLICY "avatars_policy" 
ON storage.objects FOR ALL 
USING (bucket_id = 'avatars');

-- Verify the policy was created
SELECT * FROM storage.policies WHERE bucket_id = 'avatars';
