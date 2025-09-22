/*
  # Add consultation topics table
  
  1. New Tables
    - consultation_topics
      - id (uuid, primary key) 
      - name (text)
      - description (text)
      - duration_minutes (integer)
      - price (integer)
      - mentor_id (text)

  2. Security
    - Enable RLS
    - Add policy for public read access
*/

-- Create consultation_topics table
CREATE TABLE IF NOT EXISTS consultation_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  price integer NOT NULL CHECK (price > 0),
  mentor_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE consultation_topics ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public to read consultation topics"
  ON consultation_topics
  FOR SELECT
  TO public
  USING (true);

-- Create index for faster queries
CREATE INDEX consultation_topics_mentor_idx ON consultation_topics(mentor_id);

-- Add topic_id to consultations table
ALTER TABLE consultations 
ADD COLUMN topic_id uuid REFERENCES consultation_topics(id);

-- Modify time slots table to include duration
ALTER TABLE mentor_time_slots
ADD COLUMN duration_minutes integer NOT NULL DEFAULT 60;

-- Insert some sample topics
INSERT INTO consultation_topics (name, description, duration_minutes, price, mentor_id) VALUES
('Technical Interview Prep', 'Mock interviews and feedback for technical roles', 60, 149, 'mentor-1'),
('Code Review & Architecture', 'Review your code and discuss architectural decisions', 45, 112, 'mentor-1'),
('Career Guidance', 'Career path planning and skill development advice', 30, 75, 'mentor-1');