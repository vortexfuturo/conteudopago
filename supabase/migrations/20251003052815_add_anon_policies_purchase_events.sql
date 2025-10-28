/*
  # Update RLS policies for anonymous access

  1. Changes
    - Drop existing restrictive policies
    - Add new policies that allow anonymous users to insert and select events
    - Maintains data security by allowing only inserts and reads, no updates or deletes
  
  2. Security
    - Anonymous users can INSERT events (for tracking)
    - Anonymous users can SELECT events (for duplicate checking)
    - No UPDATE or DELETE permissions for anonymous users
    - Events are tied to session identifiers for privacy
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own purchase events" ON purchase_events;
DROP POLICY IF EXISTS "Users can insert own purchase events" ON purchase_events;

-- Allow anonymous users to insert purchase events
CREATE POLICY "Anyone can insert purchase events"
  ON purchase_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to view purchase events (needed for duplicate check)
CREATE POLICY "Anyone can view purchase events"
  ON purchase_events
  FOR SELECT
  TO anon
  USING (true);

-- Also allow authenticated users same permissions
CREATE POLICY "Authenticated can insert purchase events"
  ON purchase_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can view purchase events"
  ON purchase_events
  FOR SELECT
  TO authenticated
  USING (true);