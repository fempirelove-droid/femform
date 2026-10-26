import { supabase } from './supabase';

export type CommunityPost = {
  id: string;
  author_id: string;
  author_name: string;
  title: string;
  body: string;
  pinned: boolean;
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

function displayNameFromEmail(email?: string | null) {
  if (!email) return 'Member';
  const base = email.split('@')[0] || 'Member';
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export async function fetchCommunityPosts(): Promise<CommunityPost[]> {
  const { data, error } = await supabase
    .from('community_posts')
    .select('id, author_id, author_name, title, body, pinned, created_at')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50);

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

export async function createPost(input: { title: string; body: string }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Please sign in first.');

  const { data, error } = await supabase
    .from('community_posts')
    .insert({
      title: input.title.trim(),
      body: input.body.trim(),
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
