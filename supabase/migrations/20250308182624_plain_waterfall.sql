/*
  # Source Code Projects Schema

  1. New Tables
    - `source_code_projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `difficulty` (text)
      - `technologies` (text[])
      - `features` (text[])
      - `github_url` (text)
      - `demo_url` (text)
      - `image_url` (text)
      - `stars` (integer)
      - `forks` (integer)
      - `views` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access
*/

-- Create source_code_projects table
CREATE TABLE IF NOT EXISTS source_code_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL,
  technologies text[] NOT NULL,
  features text[] NOT NULL,
  github_url text NOT NULL,
  demo_url text NOT NULL,
  image_url text NOT NULL,
  stars integer DEFAULT 0,
  forks integer DEFAULT 0,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE source_code_projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public to read source code projects"
  ON source_code_projects
  FOR SELECT
  TO public
  USING (true);

-- Add sample data for Web Development category
INSERT INTO source_code_projects (title, description, category, difficulty, technologies, features, github_url, demo_url, image_url, stars, forks, views) VALUES
(
  'E-Commerce Platform',
  'A full-featured e-commerce platform with product management, cart functionality, and payment integration using Stripe.',
  'Web Development',
  'Intermediate',
  ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
  ARRAY['User authentication', 'Product catalog', 'Shopping cart', 'Payment processing', 'Order management'],
  'https://github.com/example/ecommerce',
  'https://demo-ecommerce.example.com',
  'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
  1250,
  340,
  5600
),
(
  'Real-time Chat Application',
  'A modern chat application with real-time messaging, file sharing, and user presence indicators.',
  'Web Development',
  'Advanced',
  ARRAY['React', 'Socket.io', 'Node.js', 'PostgreSQL', 'Redis'],
  ARRAY['Real-time messaging', 'File sharing', 'User presence', 'Message history', 'Typing indicators'],
  'https://github.com/example/chat-app',
  'https://demo-chat.example.com',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
  890,
  230,
  3400
),
(
  'Task Management System',
  'A comprehensive project management tool with task tracking, team collaboration, and analytics features.',
  'Web Development',
  'Intermediate',
  ARRAY['Vue.js', 'Django', 'PostgreSQL', 'Redis', 'Celery'],
  ARRAY['Task tracking', 'Team collaboration', 'File attachments', 'Due dates', 'Analytics'],
  'https://github.com/example/task-manager',
  'https://demo-tasks.example.com',
  'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
  760,
  180,
  2800
);

-- Add sample data for Mobile Development category
INSERT INTO source_code_projects (title, description, category, difficulty, technologies, features, github_url, demo_url, image_url, stars, forks, views) VALUES
(
  'Fitness Tracking App',
  'A comprehensive mobile app for tracking workouts, nutrition, and fitness progress.',
  'Mobile Development',
  'Intermediate',
  ARRAY['React Native', 'Firebase', 'Redux', 'Node.js'],
  ARRAY['Workout tracking', 'Nutrition logging', 'Progress charts', 'Social sharing'],
  'https://github.com/example/fitness-app',
  'https://demo-fitness.example.com',
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
  850,
  220,
  3200
);

-- Add sample data for Game Development category
INSERT INTO source_code_projects (title, description, category, difficulty, technologies, features, github_url, demo_url, image_url, stars, forks, views) VALUES
(
  '2D Platformer Game',
  'A classic platformer game with multiple levels, power-ups, and achievements.',
  'Game Development',
  'Advanced',
  ARRAY['Unity', 'C#', 'Photon Networking', 'SQLite'],
  ARRAY['Multiple levels', 'Power-ups', 'Achievements', 'Leaderboard'],
  'https://github.com/example/platformer-game',
  'https://demo-game.example.com',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  920,
  280,
  4100
);

-- Add sample data for Machine Learning category
INSERT INTO source_code_projects (title, description, category, difficulty, technologies, features, github_url, demo_url, image_url, stars, forks, views) VALUES
(
  'Image Recognition API',
  'A machine learning API for image recognition and classification using deep learning.',
  'Machine Learning',
  'Advanced',
  ARRAY['Python', 'TensorFlow', 'Flask', 'Docker', 'Redis'],
  ARRAY['Image classification', 'Object detection', 'API endpoints', 'Batch processing'],
  'https://github.com/example/image-recognition',
  'https://demo-ml.example.com',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  1100,
  320,
  4800
);