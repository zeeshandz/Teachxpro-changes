/*
  # Fix masterclass enrollments RLS policies

  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper permissions
    - Add policy for public inserts without auth check
    - Add policy for viewing own enrollments
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to insert masterclass enrollments" ON masterclass_enrollments;
DROP POLICY IF EXISTS "Users can view their own enrollments" ON masterclass_enrollments;

-- Create new policies
CREATE POLICY "Allow public to insert masterclass enrollments"
  ON masterclass_enrollments
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own enrollments"
  ON masterclass_enrollments
  FOR SELECT
  TO public
  USING (
    LOWER(email) = LOWER(current_user)
    OR
    LOWER(email) = LOWER(COALESCE((SELECT email FROM auth.users WHERE id = auth.uid()), current_user))
  );

-- Create index for case-insensitive email searches if not exists
CREATE INDEX IF NOT EXISTS masterclass_enrollments_email_lower_idx 
ON masterclass_enrollments(LOWER(email));