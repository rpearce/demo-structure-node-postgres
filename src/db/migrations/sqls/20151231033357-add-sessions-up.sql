CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users,
  is_active boolean NOT NULL DEFAULT true,
  network_id uuid, /* will come back to this one... */
  created_at timestamp DEFAULT (current_timestamp AT TIME ZONE 'utc')
);
