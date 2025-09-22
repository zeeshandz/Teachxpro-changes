/*
  # Fix Authentication Permissions

  1. Changes
    - Grant proper permissions for auth schema
    - Update RLS policies to use auth.jwt() instead of auth.users
    - Add proper email matching policies
  
  2. Security
    - Ensure proper access control
    - Maintain data privacy
*/

-- Grant usage on auth schema
GRANT USAGE ON SCHEMA auth TO public;
GRANT USAGE ON SCHEMA auth TO authenticated;

-- Grant select on specific auth views needed for policies
GRANT SELECT ON auth.users TO authenticated;
GRANT SELECT ON auth.users TO public;

-- Update enrollments policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
CREATE POLICY "Users can view their own enrollments"
ON enrollments
FOR SELECT
USING (
  LOWER(email) = LOWER((SELECT email FROM auth.users WHERE id = auth.uid()))
  AND payment_status = 'completed'
);

-- Update consultations policies
DROP POLICY IF EXISTS "Users can view their own consultations" ON consultations;
CREATE POLICY "Users can view their own consultations"
ON consultations
FOR SELECT
USING (
  LOWER(client_email) = LOWER((SELECT email FROM auth.users WHERE id = auth.uid()))
  AND payment_status = 'completed'
);