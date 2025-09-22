/*
  # Create projects table

  1. New Tables
    - `projects` table for storing project information
      - `id` (uuid, primary key)
      - `type` (text) - article or video
      - `title` (text)
      - `tech` (text[]) - array of technologies used
      - `category` (text[]) - array of categories
      - `datePublished` (text)
      - `projectURL` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access
    - Add indexes for efficient querying

  3. Changes
    - Create projects table
    - Add sample data
    - Create necessary indexes
*/

-- Drop existing table and policies if they exist
DROP TABLE IF EXISTS projects CASCADE;

-- Create projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('article', 'video')),
  title text NOT NULL,
  tech text[] NOT NULL,
  category text[] NOT NULL,
  datePublished text NOT NULL,
  projectURL text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public to read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX projects_type_idx ON projects (type);
CREATE INDEX projects_category_idx ON projects USING gin (category);
CREATE INDEX projects_tech_idx ON projects USING gin (tech);

-- Insert sample data
INSERT INTO projects (type, title, tech, category, datePublished, projectURL) VALUES
  (
    'article',
    'ChatBot That Talks Like a Pirate',
    ARRAY['React', 'TypeScript', 'Vite', 'AWS Lambda', 'OpenAI'],
    ARRAY['web-dev'],
    '2025-01-05T12:15:00.000Z',
    'https://traintocode.com/projects/pirate-gpt/'
  ),
  (
    'article',
    'Cartoon Generator Using DALL·E',
    ARRAY['React', 'TypeScript', 'Vite', 'AWS Lambda', 'OpenAI'],
    ARRAY['web-dev'],
    '2025-01-05T12:15:00.000Z',
    'https://traintocode.com/projects/cartoon-generator/'
  ),
  (
    'video',
    'Build and Deploy a Full Stack Google Drive Clone with Next.js 15',
    ARRAY['React', 'NextJS', 'Tailwind', 'Appwrite', 'TypeScript'],
    ARRAY['web-dev'],
    '2024-11-07T18:30:00.000Z',
    'https://www.youtube.com/watch?v=lie0cr3wESQ'
  ),
  (
    'video',
    'Build and Deploy an Amazing 3D Web Developer Portfolio in React.JS Three.js Tutorial',
    ARRAY['vite', 'React', 'JavaScript', 'Three.js', 'Tailwind', 'HTML', 'CSS'],
    ARRAY['web-dev'],
    'Mar 3, 2023',
    'https://www.youtube.com/watch?v=0fYi8SGA20k&t=2218s'
  ),
  (
    'video',
    'Full-Stack Quick Commerce App with Next.Js Drizzle ORM and Cryptomus Payments',
    ARRAY['Next.js', 'React', 'JavaScript', 'Drizzle ORM', 'Cryptomus', 'HTML', 'CSS'],
    ARRAY['web-dev'],
    'Jul 19, 2024',
    'https://www.youtube.com/watch?v=vQcewScZXeI'
  );