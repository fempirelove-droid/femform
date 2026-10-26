/*
In-house member community (replaces Circle for launch).
Posts + replies. Read/write only for community or premium members.
*/

-- Manual founding access before Stripe is live: set profiles.community_access = true
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS community_access boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.can_use_community()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND (
        tier IN ('community', 'premium')
        OR community_access = true
      )
  );
$$;

CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT 'Member',
  title text NOT NULL,
  body text NOT NULL,
  pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT 'Member',
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS community_posts_created_idx ON community_posts (pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS community_replies_post_idx ON community_replies (post_id, created_at ASC);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "members_read_posts" ON community_posts;
CREATE POLICY "members_read_posts" ON community_posts
  FOR SELECT TO authenticated
  USING (public.can_use_community());

DROP POLICY IF EXISTS "members_insert_posts" ON community_posts;
CREATE POLICY "members_insert_posts" ON community_posts
  FOR INSERT TO authenticated
  WITH CHECK (public.can_use_community() AND author_id = auth.uid());

DROP POLICY IF EXISTS "authors_update_own_posts" ON community_posts;
CREATE POLICY "authors_update_own_posts" ON community_posts
  FOR UPDATE TO authenticated
  USING (public.can_use_community() AND author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

DROP POLICY IF EXISTS "authors_delete_own_posts" ON community_posts;
CREATE POLICY "authors_delete_own_posts" ON community_posts
  FOR DELETE TO authenticated
  USING (public.can_use_community() AND author_id = auth.uid());

DROP POLICY IF EXISTS "members_read_replies" ON community_replies;
CREATE POLICY "members_read_replies" ON community_replies
  FOR SELECT TO authenticated
  USING (public.can_use_community());

DROP POLICY IF EXISTS "members_insert_replies" ON community_replies;
CREATE POLICY "members_insert_replies" ON community_replies
  FOR INSERT TO authenticated
  WITH CHECK (public.can_use_community() AND author_id = auth.uid());

DROP POLICY IF EXISTS "authors_delete_own_replies" ON community_replies;
CREATE POLICY "authors_delete_own_replies" ON community_replies
  FOR DELETE TO authenticated
  USING (public.can_use_community() AND author_id = auth.uid());
