/*
  # Fix chat responses policies

  This migration ensures policies are created only if they don't already exist.
  Uses DO blocks to safely handle policy creation.
*/

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Allow public to insert chat responses" ON chat_responses;
  DROP POLICY IF EXISTS "Users can view their own responses" ON chat_responses;

  -- Create insert policy
  CREATE POLICY "Allow public to insert chat responses"
    ON chat_responses
    FOR INSERT
    TO public
    WITH CHECK (true);

  -- Create select policy
  CREATE POLICY "Users can view their own responses"
    ON chat_responses
    FOR SELECT
    TO authenticated
    USING (email = auth.jwt() ->> 'email');

EXCEPTION
  WHEN undefined_table THEN
    -- Table doesn't exist, create it first
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

    -- Create index
    CREATE INDEX IF NOT EXISTS chat_responses_email_idx ON chat_responses(email);
END $$;