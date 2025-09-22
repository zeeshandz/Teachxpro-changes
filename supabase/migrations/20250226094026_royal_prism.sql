/*
  # Add course images table and storage configuration

  1. New Tables
    - `course_images` table to store image metadata
      - `id` (uuid, primary key)
      - `course_id` (text, unique)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `course_images` table
    - Add policy for public read access
*/

-- Create course_images table
CREATE TABLE IF NOT EXISTS course_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id text UNIQUE NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE course_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public to read course images"
  ON course_images
  FOR SELECT
  TO public
  USING (true);

-- Insert initial course images
INSERT INTO course_images (course_id, image_url) VALUES
  ('spring-boot-micro-ai', 'courses/spring-boot-microservices.jpg'),
  ('spring-boot-mvc', 'courses/spring-boot-mvc.jpg'),
  ('problem-solving', 'courses/problem-solving.jpg'),
  ('java-beginners', 'courses/java-beginners.jpg'),
  ('data-analytics-excel', 'courses/data-analytics-excel.jpg'),
  ('data-analytics-python', 'courses/data-analytics-python.jpg'),
  ('cloud-azure', 'courses/cloud-azure.jpg'),
  ('product-management', 'courses/product-management.jpg'),
  ('data-engineering-pipeline', 'courses/data-engineering.jpg'),
  ('full-stack-development', 'courses/full-stack.jpg'),
  ('generative-ai', 'courses/generative-ai.jpg'),
  ('rad-react-supabase', 'courses/react-supabase.jpg'),
  ('mobile-application-development', 'courses/mobile-dev.jpg'),
  ('microsoft-bot-framework', 'courses/bot-framework.jpg'),
  ('prompt-development', 'courses/prompt-engineering.jpg');