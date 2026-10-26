/*
# Fempire.Love — Articles CMS Schema

## Purpose
Creates a content management system for Fempire.Love articles with categories,
so articles can be managed in the database and rendered with clean URLs
(e.g. fempire.love/the-change/first-signs-of-perimenopause).

## New Tables

### categories
- id (uuid, primary key)
- slug (text, unique) — URL-safe identifier, e.g. "the-change"
- name (text) — display name, e.g. "The Change"
- description (text) — short tagline
- sort_order (int) — display ordering
- glow_color (text) — CSS color for orb glow
- orb_gradient (text) — CSS gradient for orb
- created_at (timestamptz)

### articles
- id (uuid, primary key)
- slug (text, unique) — URL-safe identifier, e.g. "first-signs-of-perimenopause"
- title (text) — article headline (question format)
- category_id (uuid, foreign key → categories)
- excerpt (text) — first 2-3 sentence answer / summary
- body (text) — full article content in HTML
- faq (jsonb) — array of {question, answer} pairs
- cover_image (text) — optional URL
- is_free (boolean) — true = accessible to everyone, false = members only
- reading_time_min (int) — estimated reading time
- author_name (text) — e.g. "Fempire.Love Editorial"
- author_bio (text) — short author description
- medical_reviewed (boolean) — whether a medical professional reviewed
- medical_reviewer_name (text) — name of reviewer if applicable
- status (text) — 'published' or 'draft'
- published_at (timestamptz) — publication date
- updated_at (timestamptz) — last content update
- created_at (timestamptz)

## Security
- RLS enabled on both tables.
- Public read access (anon + authenticated) for published articles and all categories — content is public by design.
- Write access restricted to authenticated users (for CMS editing later).
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  glow_color text NOT NULL DEFAULT 'rgba(255,92,138,0.55)',
  orb_gradient text NOT NULL DEFAULT 'radial-gradient(circle at 30% 30%, #FF9EBB, #FF5C8A)',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  faq jsonb NOT NULL DEFAULT '[]'::jsonb,
  cover_image text NOT NULL DEFAULT '',
  is_free boolean NOT NULL DEFAULT true,
  reading_time_min int NOT NULL DEFAULT 5,
  author_name text NOT NULL DEFAULT 'Fempire.Love Editorial',
  author_bio text NOT NULL DEFAULT '',
  medical_reviewed boolean NOT NULL DEFAULT false,
  medical_reviewer_name text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'published',
  published_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Categories: public read, authenticated write
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_categories" ON categories;
CREATE POLICY "auth_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_categories" ON categories;
CREATE POLICY "auth_update_categories" ON categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_categories" ON categories;
CREATE POLICY "auth_delete_categories" ON categories FOR DELETE
  TO authenticated USING (true);

-- Articles: public can read published, authenticated can read all + write
DROP POLICY IF EXISTS "public_read_published_articles" ON articles;
CREATE POLICY "public_read_published_articles" ON articles FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "auth_read_all_articles" ON articles;
CREATE POLICY "auth_read_all_articles" ON articles FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_articles" ON articles;
CREATE POLICY "auth_insert_articles" ON articles FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_articles" ON articles;
CREATE POLICY "auth_update_articles" ON articles FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_articles" ON articles;
CREATE POLICY "auth_delete_articles" ON articles FOR DELETE
  TO authenticated USING (true);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
