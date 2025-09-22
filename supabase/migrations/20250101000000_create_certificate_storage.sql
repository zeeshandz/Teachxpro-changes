-- Create storage bucket for internship certificates (private bucket)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'internship-certificates',
  'internship-certificates',
  false, -- Private bucket
  52428800, -- 50MB limit
  ARRAY['application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public read access for certificates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload certificates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update certificates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete certificates" ON storage.objects;

-- Policy 1: Allow public read access to certificates (for verification)
-- This allows anyone to view/download certificates without authentication
CREATE POLICY "Public read access for certificates" ON storage.objects
FOR SELECT USING (
  bucket_id = 'internship-certificates' 
  AND (storage.foldername(name))[1] = 'certificates'
);

-- Policy 2: Allow authenticated users to upload certificates (for admin use)
CREATE POLICY "Authenticated users can upload certificates" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'internship-certificates' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'certificates'
);

-- Policy 3: Allow authenticated users to update certificates (for admin use)
CREATE POLICY "Authenticated users can update certificates" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'internship-certificates' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'certificates'
);

-- Policy 4: Allow authenticated users to delete certificates (for admin use)
CREATE POLICY "Authenticated users can delete certificates" ON storage.objects
FOR DELETE USING (
  bucket_id = 'internship-certificates' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'certificates'
);

-- Add certificate_url column to internship table for easier access
ALTER TABLE internship 
ADD COLUMN IF NOT EXISTS certificate_url TEXT;

-- Create index for faster certificate lookups
CREATE INDEX IF NOT EXISTS idx_internship_certificate_url 
ON internship(certificate_url) 
WHERE certificate_url IS NOT NULL; 