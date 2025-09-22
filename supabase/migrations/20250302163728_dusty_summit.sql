/*
  # Fix consultations table structure
  
  1. Changes
    - Remove status column references
    - Add consultation_status column
    - Update existing records
    - Add proper constraints
*/

-- Add consultation_status column if it doesn't exist
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS consultation_status text NOT NULL 
DEFAULT 'scheduled'
CHECK (consultation_status IN ('scheduled', 'completed', 'cancelled'));

-- Create index for consultation status queries
CREATE INDEX IF NOT EXISTS consultations_status_idx 
ON consultations(consultation_status);