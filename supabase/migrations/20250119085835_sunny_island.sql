/*
  # Create enrollments table

  1. New Tables
    - `enrollments`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `course_id` (text)
      - `course_name` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `enrollments` table
    - Add policy for inserting data
*/

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course_id text NOT NULL,
  course_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert enrollments"
  ON enrollments
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to view their own enrollments"
  ON enrollments
  FOR SELECT
  TO public
  USING (email = current_user);