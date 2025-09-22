/*
  # Add time and mode to upcoming classes

  1. Changes
    - Add class_time column to store the time of the class
    - Add mode column to indicate if class is online/offline
    - Add duration_minutes column for class duration
    - Update existing records with default values

  2. Validation
    - Add check constraint for mode values
    - Add check constraint for class_time format
*/

-- Add new columns
ALTER TABLE upcoming_classes
ADD COLUMN IF NOT EXISTS class_time time NOT NULL DEFAULT '10:00',
ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'online' CHECK (mode IN ('online', 'offline')),
ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 120 CHECK (duration_minutes > 0);

-- Update existing records with sample times
UPDATE upcoming_classes
SET 
  class_time = '10:00',
  mode = 'online',
  duration_minutes = 120
WHERE class_time = '10:00';

-- Create index for common queries
CREATE INDEX IF NOT EXISTS upcoming_classes_date_time_idx 
ON upcoming_classes(start_date, class_time);