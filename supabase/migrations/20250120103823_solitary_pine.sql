/*
  # Add consultations table with validations

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `mentor_id` (text, required)
      - `mentor_name` (text, required)
      - `client_name` (text, required)
      - `client_email` (text, required, email format)
      - `client_phone` (text, required, phone format)
      - `consultation_date` (date, required, future date only)
      - `consultation_time` (time, required)
      - `notes` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `consultations` table
    - Add policy for public to insert consultations
    - Add policy for users to view their own consultations

  3. Validations
    - Email format validation
    - Phone number format validation (10 digits)
    - Future date validation for consultation_date
*/

-- Create the consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id text NOT NULL,
  mentor_name text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL CHECK (client_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  client_phone text NOT NULL CHECK (client_phone ~* '^\d{10}$'),
  consultation_date date NOT NULL CHECK (consultation_date > CURRENT_DATE),
  consultation_time time NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to insert consultations
CREATE POLICY "Allow public to insert consultations"
  ON consultations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow users to view their own consultations
CREATE POLICY "Allow users to view their own consultations"
  ON consultations
  FOR SELECT
  TO public
  USING (client_email = current_user);

-- Create index for faster queries
CREATE INDEX consultations_mentor_id_idx ON consultations(mentor_id);
CREATE INDEX consultations_client_email_idx ON consultations(client_email);