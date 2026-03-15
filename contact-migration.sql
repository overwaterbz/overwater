-- Contact Inquiries Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT DEFAULT 'General Question',
  message TEXT NOT NULL,
  source TEXT DEFAULT 'overwater.com',
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'new'
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_inquiries (email);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_inquiries (created_at DESC);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "service_role_all" ON contact_inquiries
  FOR ALL USING (auth.role() = 'service_role');

-- Anon can insert (for contact forms)
CREATE POLICY "anon_insert" ON contact_inquiries
  FOR INSERT WITH CHECK (true);
