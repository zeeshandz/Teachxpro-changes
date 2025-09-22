/*
  # Add meet_link column to consultations table

  1. Changes
    - Add meet_link column to consultations table for storing Google Meet URLs
    - Create index for optimizing meet_link queries
*/

-- Add meet_link column if it doesn't exist
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS meet_link text;

-- Create index for meet_link queries
CREATE INDEX IF NOT EXISTS consultations_meet_link_idx 
ON consultations(meet_link);