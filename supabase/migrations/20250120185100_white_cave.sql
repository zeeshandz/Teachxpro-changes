/*
  # Remove meet_link column from consultations table

  1. Changes
    - Drop meet_link column from consultations table
    - Drop associated index
*/

-- Drop the index first
DROP INDEX IF EXISTS consultations_meet_link_idx;

-- Drop the meet_link column
ALTER TABLE consultations 
DROP COLUMN IF EXISTS meet_link;