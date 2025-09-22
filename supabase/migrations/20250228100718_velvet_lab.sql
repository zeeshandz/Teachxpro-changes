/*
  # Add time slots and bookings tables
  
  1. New Tables
    - `mentor_time_slots`
      - `id` (uuid, primary key)
      - `mentor_id` (text)
      - `date` (date)
      - `time` (time)
      - `is_available` (boolean)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `mentor_time_slots` table
    - Add policy for public read access
*/

-- Create mentor_time_slots table
CREATE TABLE IF NOT EXISTS mentor_time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(mentor_id, date, time)
);

-- Enable RLS
ALTER TABLE mentor_time_slots ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public to read time slots"
  ON mentor_time_slots
  FOR SELECT
  TO public
  USING (true);

-- Create index for faster queries
CREATE INDEX mentor_time_slots_mentor_date_idx ON mentor_time_slots(mentor_id, date);

-- Add trigger to automatically mark slot as unavailable when consultation is booked
CREATE OR REPLACE FUNCTION update_time_slot_availability()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE mentor_time_slots
  SET is_available = false
  WHERE mentor_id = NEW.mentor_id
    AND date = NEW.consultation_date::date
    AND time = NEW.consultation_time::time;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER consultation_booked
  AFTER INSERT ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_time_slot_availability();