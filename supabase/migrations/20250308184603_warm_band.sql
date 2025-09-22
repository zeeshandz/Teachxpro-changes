/*
  # Add projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `type` (text) - article or video
      - `title` (text)
      - `tech` (text[]) - array of technologies used
      - `category` (text[]) - array of categories
      - `datePublished` (text) - keeping as text due to varying date formats
      - `projectURL` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access

  3. Sample Data
    - Insert initial project examples
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
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
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'projects' 
    AND policyname = 'Allow public to read projects'
  ) THEN
    CREATE POLICY "Allow public to read projects"
      ON projects
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

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

-- Create index on type for faster filtering
CREATE INDEX IF NOT EXISTS projects_type_idx ON projects (type);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects USING gin (category);

-- Create index on tech for faster filtering
CREATE INDEX IF NOT EXISTS projects_tech_idx ON projects USING gin (tech);