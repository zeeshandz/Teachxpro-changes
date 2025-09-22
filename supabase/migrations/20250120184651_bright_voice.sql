/*
  # Add meet_link column to consultations table

  1. Changes
    - Add meet_link column to consultations table
    - Create index for meet_link queries
*/

-- Add meet_link column
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS meet_link text;

-- Create index for meet_link queries
CREATE INDEX IF NOT EXISTS consultations_meet_link_idx 
ON consultations(meet_link);