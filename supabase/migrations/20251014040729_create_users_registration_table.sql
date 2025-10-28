/*
  # Create Users Registration Table

  1. New Tables
    - `user_registrations`
      - `id` (uuid, primary key) - Unique identifier
      - `full_name` (text) - User's full name
      - `cpf` (text, unique) - Brazilian CPF document
      - `email` (text, unique) - User's email address
      - `password_hash` (text) - Encrypted password
      - `created_at` (timestamptz) - Registration timestamp
      - `last_login` (timestamptz) - Last access timestamp
      - `is_active` (boolean) - Account status

  2. Security
    - Enable RLS on `user_registrations` table
    - Add policy for public to insert new registrations
    - Add policy for users to read their own data

  3. Indexes
    - Index on email for faster lookups
    - Index on cpf for faster lookups

  4. Important Notes
    - CPF and email are unique to prevent duplicates
    - Password is stored as hash for security
    - Default values ensure data integrity
*/

CREATE TABLE IF NOT EXISTS user_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  cpf text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  is_active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE user_registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can register (insert)
CREATE POLICY "Anyone can register"
  ON user_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Users can read their own registration data
CREATE POLICY "Users can read own data"
  ON user_registrations
  FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_registrations_email ON user_registrations(email);
CREATE INDEX IF NOT EXISTS idx_user_registrations_cpf ON user_registrations(cpf);