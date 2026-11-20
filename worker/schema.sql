-- D1 schema for the engagement Worker. Apply with:
--   npx wrangler d1 execute site-engage --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS posts (
  slug   TEXT PRIMARY KEY,
  claps  INTEGER NOT NULL DEFAULT 0,
  views  INTEGER NOT NULL DEFAULT 0
);
-- How many claps one reader (or one network, per day) has given one post.
-- `who` is a salted hash, never a raw IP or reader id.
CREATE TABLE IF NOT EXISTS clappers (
  slug TEXT NOT NULL,
  who  TEXT NOT NULL,
  n    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, who)
);
CREATE TABLE IF NOT EXISTS subscribers (
  email        TEXT PRIMARY KEY,
  token        TEXT NOT NULL UNIQUE,
  status       TEXT NOT NULL DEFAULT 'pending',  -- pending | active
  created_at   TEXT NOT NULL,
  confirmed_at TEXT
);
-- Posts already announced by email (so each one goes out once).
CREATE TABLE IF NOT EXISTS sent (
  link    TEXT PRIMARY KEY,
  sent_at TEXT NOT NULL
);
-- Simple fixed-window rate limits for the subscribe form.
CREATE TABLE IF NOT EXISTS hits (
  key TEXT PRIMARY KEY,
  n   INTEGER NOT NULL
);
