/*
  # Add consultations policies

  1. Security
    - Add policy for users to view their own consultations
    - Add policy for users to insert consultations
*/

-- Enable RLS for consultations table if not already enabled
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own consultations
CREATE POLICY "Users can view their own consultations"
  ON consultations
  FOR SELECT
  USING (client_email = auth.jwt() ->> 'email');

-- Create policy for users to insert consultations
CREATE POLICY "Users can insert consultations"
  ON consultations
  FOR INSERT
  WITH CHECK (client_email = auth.jwt() ->> 'email');