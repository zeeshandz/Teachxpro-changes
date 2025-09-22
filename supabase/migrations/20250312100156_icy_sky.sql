/*
  # Add masterclass enrollments table

  1. New Tables
    - `masterclass_enrollments`
      - `id` (uuid, primary key)
      - `class_id` (uuid, references upcoming_classes)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `payment_id` (text)
      - `payment_status` (text)
      - `amount` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for inserting and viewing enrollments
*/

-- Create masterclass_enrollments table
CREATE TABLE IF NOT EXISTS masterclass_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES upcoming_classes(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text NOT NULL CHECK (phone ~* '^\d{10}$'),
  payment_id text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  amount integer CHECK (amount > 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE masterclass_enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to insert masterclass enrollments"
  ON masterclass_enrollments
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own enrollments"
  ON masterclass_enrollments
  FOR SELECT
  TO public
  USING (
    LOWER(email) = LOWER((SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Create indexes
CREATE INDEX masterclass_enrollments_email_idx ON masterclass_enrollments(email);
CREATE INDEX masterclass_enrollments_payment_status_idx ON masterclass_enrollments(payment_status);
CREATE INDEX masterclass_enrollments_class_id_idx ON masterclass_enrollments(class_id);