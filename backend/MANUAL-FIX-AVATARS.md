# Manual Fix for Avatars Storage RLS Error

## 🚨 Error: "new row violates row-level security policy"

This error occurs because the avatars storage bucket doesn't have the correct RLS policies set up.

## 🔧 Quick Fix Options:

### Option 1: Run SQL Script (Recommended)
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `simple-avatars-policy.sql`
4. Click **Run**

### Option 2: Manual Setup via Dashboard

#### Step 1: Create Avatars Bucket
1. Go to **Storage** in your Supabase dashboard
2. Click **"New Bucket"**
3. Name: `avatars`
4. Make it **Public** ✅
5. Click **Create Bucket**

#### Step 2: Set Storage Policies
1. Go to **Storage** → **Policies**
2. Click **"New Policy"** for storage.objects
3. Use this template:

**Policy Name:** `avatars_policy`
**Policy Type:** `For all operations`
**Target roles:** `public`
**USING expression:** `bucket_id = 'avatars'`

#### Step 3: Alternative - Disable RLS (Not Recommended for Production)
If the above doesn't work, you can temporarily disable RLS:
1. Go to **Storage** → **Policies**
2. Find the storage.objects table
3. Toggle off **"Enable RLS"** (temporarily)
4. Test the upload
5. Re-enable RLS and add proper policies

## 🧪 Test the Fix

After applying the fix:

1. Go to your profile setup page
2. Try uploading a photo
3. Check the browser console - you should see:
   ```
   Avatar uploaded successfully: https://your-project.supabase.co/storage/v1/object/public/avatars/avatar-user_123-1234567890.jpg
   ```

## 🔍 Troubleshooting

### If you still get RLS errors:
1. Check that the bucket name is exactly `avatars` (case-sensitive)
2. Verify the bucket is set to **Public**
3. Make sure the policy is applied to `storage.objects` table
4. Try the simple policy from `simple-avatars-policy.sql`

### Check Current Policies:
Run this SQL to see existing policies:
```sql
SELECT * FROM storage.policies WHERE bucket_id = 'avatars';
```

### Check Bucket Settings:
Run this SQL to see bucket configuration:
```sql
SELECT * FROM storage.buckets WHERE id = 'avatars';
```

## ✅ Expected Result

After the fix, you should see:
- ✅ Photo uploads successfully
- ✅ Avatar URL stored in database
- ✅ Photos display in matching page
- ✅ No RLS errors in console
