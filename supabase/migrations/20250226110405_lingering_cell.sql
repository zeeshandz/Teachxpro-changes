/*
  # Fix course images table and data

  1. Table Operations
    - Ensure table exists
    - Insert course image data
  
  2. Security
    - Check and create policy if not exists
  
  3. Data
    - Clean and insert course image data
*/

-- First ensure the table exists
CREATE TABLE IF NOT EXISTS course_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id text UNIQUE NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE course_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create new one
DO $$ 
BEGIN
  -- Drop the policy if it exists
  DROP POLICY IF EXISTS "Allow public to read course images" ON course_images;
  
  -- Create the policy
  CREATE POLICY "Allow public to read course images"
    ON course_images
    FOR SELECT
    TO public
    USING (true);
END $$;

-- Delete any existing data to avoid conflicts
DELETE FROM course_images;

-- Insert initial course images with proper paths
INSERT INTO course_images (course_id, image_url) VALUES
  ('full-stack-development', 'courses/full-stack-development.jpg'),
  ('mobile-application-development', 'courses/mobile-application-development.jpg'),
  ('rad-react-supabase', 'courses/rad-react-supabase.jpg');

-- Add default course image
INSERT INTO course_images (course_id, image_url) VALUES
  ('default', 'courses/default-course.jpg')
ON CONFLICT (course_id) DO NOTHING;