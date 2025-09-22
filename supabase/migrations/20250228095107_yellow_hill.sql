/*
  # Learn and Earn Applications Table

  1. New Tables
    - `learn_earn_applications`
      - `id` (uuid, primary key)
      - `user_type` (text) - Student/Alumni/Professional
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `university` (text)
      - `course` (text)
      - `year` (text)
      - `experience` (text)
      - `message` (text)
      - `project_interests` (text[])
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow public inserts
    - Allow users to view their own applications
*/

-- Create learn_earn_applications table
CREATE TABLE IF NOT EXISTS learn_earn_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  university text,
  course text,
  year text,
  experience text,
  message text,
  project_interests text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE learn_earn_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts
CREATE POLICY "Allow public to insert applications"
  ON learn_earn_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for users to view their own applications
CREATE POLICY "Users can view their own applications"
  ON learn_earn_applications
  FOR SELECT
  TO public
  USING (email = current_user);

-- Create index for email searches
CREATE INDEX learn_earn_applications_email_idx ON learn_earn_applications(email);