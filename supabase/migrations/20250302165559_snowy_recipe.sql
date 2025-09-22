/*
  # Fix MySpace Queries and Indexes

  1. New Indexes
    - Add composite index for enrollments (payment_status, email)
    - Add composite index for consultations (payment_status, client_email)
    - Add trigram indexes for case-insensitive email searches
  
  2. Security
    - Update RLS policies for better access control
*/

-- Enable pg_trgm extension for better text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Drop existing indexes to avoid conflicts
DROP INDEX IF EXISTS enrollments_payment_status_email_idx;
DROP INDEX IF EXISTS enrollments_email_lower_idx;
DROP INDEX IF EXISTS consultations_payment_status_email_idx;
DROP INDEX IF EXISTS consultations_email_lower_idx;

-- Create new optimized indexes
CREATE INDEX enrollments_payment_status_email_idx 
ON enrollments(payment_status, email text_pattern_ops);

CREATE INDEX enrollments_email_trgm_idx 
ON enrollments USING gin (email gin_trgm_ops);

CREATE INDEX consultations_payment_status_email_idx 
ON consultations(payment_status, client_email text_pattern_ops);

CREATE INDEX consultations_email_trgm_idx 
ON consultations USING gin (client_email gin_trgm_ops);

-- Update RLS policies for enrollments
DROP POLICY IF EXISTS "Users can view their own enrollments" ON enrollments;
CREATE POLICY "Users can view their own enrollments"
ON enrollments
FOR SELECT
USING (
  email ILIKE (SELECT email FROM auth.users WHERE id = auth.uid())
  AND payment_status = 'completed'
);

-- Update RLS policies for consultations
DROP POLICY IF EXISTS "Users can view their own consultations" ON consultations;
CREATE POLICY "Users can view their own consultations"
ON consultations
FOR SELECT
USING (
  client_email ILIKE (SELECT email FROM auth.users WHERE id = auth.uid())
  AND payment_status = 'completed'
);