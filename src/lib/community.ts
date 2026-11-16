import { MEDIA } from './media';
import { supabase, isSupabaseConfigured } from './supabase';

export type CommunityRoom = {
  id: string;
  slug: string;
  name: string;
  description: string;
  scene: string | null;
  sort_order: number;
};

export type CommunityPost = {
  id: string;
  author_id: string;
  author_name: string;
  title: string;
  body: string;
  pinned: boolean;
  room_id: string | null;
  created_at: string;
  reply_count?: number;
};

export type CommunityReply = {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

/** Local fallback when Supabase rooms table is offline. */
export const ROOM_CATALOG: CommunityRoom[] = [
  {
    id: 'local-open-circle',
    slug: 'open-circle',
    name: 'Open Circle',
    description: "Anything in the women's realm. Soft talk, big questions, no taboo.",
    scene: MEDIA.queenCrownStreet,
    sort_order: 1,
  },
  {
    id: 'local-hormones-cycle',
    slug: 'hormones-cycle',
    name: 'Queenerty · Hormones & Cycle',
    description: 'Cycles, energy, Queenerty — the crown of yourself in your body.',
    scene: MEDIA.queenCrownMagenta,
    sort_order: 2,
  },
  {
    id: 'local-the-change',
    slug: 'the-change',
    name: 'The Change',
    description: 'Perimenopause, menopause, and the first signs no one warned you about.',
    scene: MEDIA.queenCrownYellow,
    sort_order: 3,
  },
  {
    id: 'local-motherhood',
    slug: 'motherhood',
    name: 'Motherhood',
    description: 'From pregnancy to mothering at a distance, without judgement.',
    scene: MEDIA.queenCrownPortrait,
    sort_order: 4,
  },
  {
    id: 'local-mind-wellness',
    slug: 'mind-wellness',
    name: 'Mind & Wellness',
    description: 'Burnout, anxiety, boundaries, and pragmatic peace.',
    scene: MEDIA.natureSerenity,
    sort_order: 5,
  },
  {
    id: 'local-body-wisdom',
    slug: 'body-wisdom',
    name: 'Body Wisdom',
    description: "Food, sleep, heat, and movement from a Caribbean women's perspective.",
    scene: MEDIA.caribbeanPeace,
    sort_order: 6,
  },
];

function displayNameFromEmail(email?: string | null) {
  if (!email) return 'Member';
  const base = email.split('@')[0] || 'Member';
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export async function fetchCommunityRooms(): Promise<CommunityRoom[]> {
  if (!isSupabaseConfigured) return ROOM_CATALOG;

  const { data, error } = await supabase
    .from('community_rooms')
    .select('id, slug, name, description, scene, sort_order')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('fetchCommunityRooms', error);
    return ROOM_CATALOG;
  }
  if (!data?.length) return ROOM_CATALOG;
  return data as CommunityRoom[];
}

export async function fetchCommunityPosts(roomId?: string | null): Promise<CommunityPost[]> {
  let query = supabase
    .from('community_posts')
    .select('id, author_id, author_name, title, body, pinned, room_id, created_at')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50);

  if (roomId) {
    query = query.eq('room_id', roomId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('fetchCommunityPosts', error);
    throw new Error(error.message);
  }
  return (data as CommunityPost[]) || [];
}

export async function fetchReplies(postId: string): Promise<CommunityReply[]> {
  const { data, error } = await supabase
    .from('community_replies')
    .select('id, post_id, author_id, author_name, body, created_at')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('fetchReplies', error);
    throw new Error(error.message);
  }
  return (data as CommunityReply[]) || [];
}

export async function createPost(input: { title: string; body: string; roomId: string }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Please sign in first.');

  const { data, error } = await supabase
    .from('community_posts')
    .insert({
      title: input.title.trim(),
      body: input.body.trim(),
      room_id: input.roomId,
      author_id: user.id,
      author_name: displayNameFromEmail(user.email),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as CommunityPost;
}

export async function createReply(postId: string, body: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Please sign in first.');

  const { data, error } = await supabase
    .from('community_replies')
    .insert({
      post_id: postId,
      body: body.trim(),
      author_id: user.id,
      author_name: displayNameFromEmail(user.email),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as CommunityReply;
}

export async function deletePost(postId: string) {
  const { error } = await supabase.from('community_posts').delete().eq('id', postId);
  if (error) throw new Error(error.message);
}
