CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar NOT NULL,
  email varchar NOT NULL,
  network_id uuid NOT NULL,
  is_admin boolean DEFAULT false,
  is_banned boolean DEFAULT false,
  image text,
  created_at timestamp DEFAULT (current_timestamp AT TIME ZONE 'utc'),
  updated_at timestamp DEFAULT (current_timestamp AT TIME ZONE 'utc')
);
