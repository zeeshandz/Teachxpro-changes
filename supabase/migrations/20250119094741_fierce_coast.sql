/*
  # Create upcoming classes table

  1. New Tables
    - `upcoming_classes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `start_date` (date)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `upcoming_classes` table
    - Add policy for public to read upcoming classes
*/

CREATE TABLE IF NOT EXISTS upcoming_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  start_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE upcoming_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read upcoming classes"
  ON upcoming_classes
  FOR SELECT
  TO public
  USING (true);

-- Insert some initial data
INSERT INTO upcoming_classes (title, start_date) VALUES
  ('Advanced React Patterns', '2024-02-15'),
  ('Cloud Architecture Masterclass', '2024-02-20'),
  ('Mobile App Development Workshop', '2024-03-01'),
  ('DevOps & CI/CD Pipeline', '2024-03-05'),
  ('Machine Learning Fundamentals', '2024-03-10');