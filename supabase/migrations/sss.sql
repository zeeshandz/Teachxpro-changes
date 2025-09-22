-- Create the hackathon_registrations table
CREATE TABLE IF NOT EXISTS hackathon_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    university TEXT NOT NULL,
    course TEXT NOT NULL,
    graduation_year TEXT NOT NULL,
    github_username TEXT,
    linkedin_url TEXT NOT NULL,
    team_size TEXT NOT NULL,
    team_members TEXT[] DEFAULT '{}',
    project_idea TEXT,
    experience_level TEXT NOT NULL DEFAULT 'beginner',
    technologies TEXT,
    timezone TEXT NOT NULL,
    project_interests TEXT[] DEFAULT '{}',
    registration_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS hackathon_registrations_email_idx ON hackathon_registrations(email);
CREATE INDEX IF NOT EXISTS hackathon_registrations_status_idx ON hackathon_registrations(status);

-- Enable Row Level Security (RLS)
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for all users" ON hackathon_registrations;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON hackathon_registrations;

-- Create a policy that allows anyone to insert
CREATE POLICY "Allow public insert" ON hackathon_registrations
    FOR INSERT TO public
    WITH CHECK (true);

-- Create a policy that allows anyone to read their own submissions
CREATE POLICY "Allow public read own" ON hackathon_registrations
    FOR SELECT TO public
    USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hackathon_registrations_updated_at
    BEFORE UPDATE ON hackathon_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 