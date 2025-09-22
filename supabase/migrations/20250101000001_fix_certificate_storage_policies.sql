-- Fix storage policies for existing internship-certificates bucket
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