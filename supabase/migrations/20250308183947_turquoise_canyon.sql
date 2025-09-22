/*
  # Create source code projects table

  1. New Tables
    - `source_code_projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `difficulty` (text, enum)
      - `technologies` (text[])
      - `features` (text[])
      - `githubUrl` (text)
      - `demoUrl` (text)
      - `image_url` (text)
      - `stars` (integer)
      - `forks` (integer)
      - `views` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `source_code_projects` table
    - Add policy for public read access

  3. Sample Data
    - Insert initial project examples
*/

-- Create source_code_projects table if it doesn't exist
CREATE TABLE IF NOT EXISTS source_code_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  technologies text[] NOT NULL,
  features text[] NOT NULL,
  githubUrl text NOT NULL,
  demoUrl text NOT NULL,
  image_url text NOT NULL,
  stars integer DEFAULT 0,
  forks integer DEFAULT 0,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE source_code_projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'source_code_projects' 
    AND policyname = 'Allow public to read source code projects'
  ) THEN
    CREATE POLICY "Allow public to read source code projects"
      ON source_code_projects
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Insert sample data if table is empty
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM source_code_projects LIMIT 1) THEN
    INSERT INTO source_code_projects (title, description, category, difficulty, technologies, features, githubUrl, demoUrl, image_url, stars, forks, views)
    VALUES
      (
        'E-Commerce Platform',
        'A full-featured e-commerce platform with product management, cart, and payment integration.',
        'Web Development',
        'Intermediate',
        ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'],
        ARRAY['Product Management', 'Shopping Cart', 'Payment Processing', 'Order Tracking'],
        'https://github.com/example/ecommerce',
        'https://demo-ecommerce.example.com',
        'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
        1250,
        340,
        5600
      ),
      (
        'Chat Application',
        'Real-time chat application with WebSocket integration and file sharing capabilities.',
        'Web Development',
        'Intermediate',
        ARRAY['React', 'Socket.io', 'Express', 'PostgreSQL'],
        ARRAY['Real-time Messaging', 'File Sharing', 'User Presence', 'Message History'],
        'https://github.com/example/chat-app',
        'https://demo-chat.example.com',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
        890,
        230,
        3400
      ),
      (
        'Task Management System',
        'Project management tool with task tracking, team collaboration, and analytics.',
        'Web Development',
        'Advanced',
        ARRAY['Vue.js', 'Django', 'Redis', 'PostgreSQL'],
        ARRAY['Task Tracking', 'Team Collaboration', 'Analytics Dashboard', 'File Attachments'],
        'https://github.com/example/task-manager',
        'https://demo-tasks.example.com',
        'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
        760,
        180,
        2800
      );
  END IF;
END $$;