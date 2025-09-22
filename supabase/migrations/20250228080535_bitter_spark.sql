/*
  # Add chat responses table
  
  1. New Tables
    - `chat_responses` - Stores user responses from the Project Query Assistant
      - `id` (uuid, primary key)
      - `user_type` (text) - Student, Alumni, or Professional
      - `project_interests` (text[]) - Array of project categories
      - `experience_level` (text) - Experience level
      - `message` (text) - Additional message/notes
      - `created_at` (timestamptz)
      - `email` (text)
      - `phone` (text)
      - `name` (text)

  2. Security
    - Enable RLS
    - Add policy for inserting responses
    - Add policy for users to view their own responses
*/

-- Create chat_responses table
CREATE TABLE IF NOT EXISTS chat_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type text NOT NULL,
  project_interests text[] NOT NULL,
  experience_level text NOT NULL,
  message text,
  email text NOT NULL,
  phone text,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chat_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to insert chat responses"
  ON chat_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own responses"
  ON chat_responses
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Create index for email searches
CREATE INDEX chat_responses_email_idx ON chat_responses(email);