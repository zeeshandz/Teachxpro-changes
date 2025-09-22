/*
  # Fix consultations policies and add indexes

  1. Changes
    - Drop existing policies
    - Create new policies with proper email matching
    - Add indexes for better query performance
    - Update RLS policies to handle both authenticated and public access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own consultations" ON consultations;
DROP POLICY IF EXISTS "Allow users to view their own consultations" ON consultations;

-- Create new policies with proper email matching
CREATE POLICY "Users can view their own consultations"
  ON consultations
  FOR SELECT
  TO public
  USING (
    LOWER(client_email) = LOWER(COALESCE(
      (SELECT email FROM auth.users WHERE id = auth.uid()),
      client_email
    ))
  );

-- Create trigram index for case-insensitive email searches if not exists
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS consultations_email_trgm_idx 
ON consultations USING gin (client_email gin_trgm_ops);

-- Create composite index for common query pattern
CREATE INDEX IF NOT EXISTS consultations_email_payment_status_idx 
ON consultations(LOWER(client_email), payment_status, consultation_status);