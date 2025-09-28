# JavaScript-Only Supabase Setup

This guide shows how to use Supabase with pure JavaScript (no API routes needed).

## 🚀 Quick Setup

### 1. Environment Variables
Create `.env.local` in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Database Setup
Your table is already created! The code now uses your `user_profiles` table:

```sql
-- Your existing table structure
CREATE TABLE user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    bio TEXT,
    gender TEXT,
    date_of_birth DATE,
    nationality TEXT,
    image TEXT,
    birth_time TIME,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (if not already enabled)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for demo purposes)
CREATE POLICY "Allow all operations" ON user_profiles FOR ALL USING (true);

-- Create avatars storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies for avatars bucket
CREATE POLICY "Allow all storage operations" ON storage.objects FOR ALL USING (bucket_id = 'avatars');
```

## 📱 How It Works

### Direct Client-Side Integration
The profile setup page now uses Supabase directly:

```javascript
// 1. Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// 2. Upload photo to storage
const { error } = await supabase.storage
  .from('profile-photos')
  .upload(filePath, file)

// 3. Save profile to database
const { data, error } = await supabase
  .from('user_profiles')
  .insert([profileData])
  .select()
```

### What Happens When User Submits:

1. **Avatar Upload**: If user uploads a photo, it's stored in Supabase Storage `avatars` bucket
2. **Database Insert**: Profile data (name, bio, birth date/time, avatar URL) is saved to `user_profiles` table
3. **Success Feedback**: User gets confirmation and form resets
4. **Console Logs**: All operations are logged for debugging

## 🔧 Features

- ✅ **Pure JavaScript** - No TypeScript complexity
- ✅ **Direct Supabase** - No API routes needed
- ✅ **Photo Upload** - Automatic file handling
- ✅ **Error Handling** - Graceful failure handling
- ✅ **Form Reset** - Clean state after submission
- ✅ **Console Logging** - Easy debugging

## 🧪 Testing

1. Start your app: `npm run dev`
2. Go to `http://localhost:3000/profile-setup`
3. Fill out the form and submit
4. Check browser console for logs
5. Check Supabase dashboard for saved data

## 📊 Data Flow

```
User Form → JavaScript → Supabase Storage (photos) → Supabase Database (profile)
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Environment variables not loaded**
   - Restart dev server after adding `.env.local`
   - Check variable names match exactly

2. **Database errors**
   - Verify table exists in Supabase
   - Check RLS policies allow operations

3. **Photo upload fails**
   - Ensure `profile-photos` bucket exists
   - Check storage policies

4. **Console errors**
   - Open browser dev tools
   - Check Network tab for failed requests

## 📁 Files Modified

- `app/profile-setup/page.tsx` - Main form with Supabase integration
- `backend/supabase-client.js` - Reusable JavaScript utilities
- `.env.local` - Environment configuration

## 🎯 Next Steps

After successful setup, you can:
- Add user authentication
- Create profile viewing pages
- Implement matching algorithms
- Add more profile fields
