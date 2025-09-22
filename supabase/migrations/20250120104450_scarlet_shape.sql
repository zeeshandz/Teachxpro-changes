/*
  # Update consultations date validation

  1. Changes
    - Modify the consultation_date check constraint to allow same-day appointments
*/

-- Drop the existing check constraint
DO $$ BEGIN
  ALTER TABLE consultations 
    DROP CONSTRAINT IF EXISTS consultations_consultation_date_check;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Add the new check constraint
ALTER TABLE consultations 
  ADD CONSTRAINT consultations_consultation_date_check 
  CHECK (consultation_date >= CURRENT_DATE);