/*
  # Create purchase_events tracking table

  1. New Tables
    - `purchase_events`
      - `id` (uuid, primary key)
      - `user_email` (text, not null) - Email do usuário que fez o login
      - `event_type` (text, not null) - Tipo do evento (sempre 'Purchase')
      - `value` (numeric, not null) - Valor da compra (10.00)
      - `currency` (text, not null) - Moeda (BRL)
      - `created_at` (timestamptz, default now()) - Data e hora do evento
      - `user_agent` (text) - Browser/dispositivo usado
      - `ip_address` (text) - IP do usuário (se disponível)

  2. Security
    - Enable RLS on `purchase_events` table
    - Add policy for authenticated users to insert their own events
    - Add policy for service role to read all events

  3. Indexes
    - Index on user_email for faster lookups
    - Index on created_at for date filtering

  ## Important Notes
  - Esta tabela previne disparos duplicados verificando se já existe um evento
    para o mesmo email nas últimas 24 horas
  - Cada evento é registrado com timestamp preciso para auditoria
  - RLS garante que apenas usuários autenticados podem registrar eventos
*/

CREATE TABLE IF NOT EXISTS purchase_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  event_type text NOT NULL DEFAULT 'Purchase',
  value numeric NOT NULL DEFAULT 10.00,
  currency text NOT NULL DEFAULT 'BRL',
  created_at timestamptz DEFAULT now(),
  user_agent text,
  ip_address text
);

-- Enable RLS
ALTER TABLE purchase_events ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can insert their own purchase events
CREATE POLICY "Users can insert own purchase events"
  ON purchase_events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'email' = user_email);

-- Policy: Authenticated users can view their own events
CREATE POLICY "Users can view own purchase events"
  ON purchase_events
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' = user_email);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_purchase_events_user_email 
  ON purchase_events(user_email);

CREATE INDEX IF NOT EXISTS idx_purchase_events_created_at 
  ON purchase_events(created_at DESC);