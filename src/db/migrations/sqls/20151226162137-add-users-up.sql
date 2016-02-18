CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar,
  email varchar NOT NULL,
  network_id uuid, /* will come back to this one... */
  is_admin boolean DEFAULT false,
  is_banned boolean DEFAULT false,
  image text,
  created_at timestamp DEFAULT (current_timestamp AT TIME ZONE 'utc'),
  updated_at timestamp DEFAULT (current_timestamp AT TIME ZONE 'utc'),
  CONSTRAINT unique_email UNIQUE (email, network_id)
);
