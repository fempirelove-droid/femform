import { useCallback, useEffect, useState } from 'react';
import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { useAuth } from '@/hooks/useAuth';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import {
  createPost,
  createReply,
  deletePost,
  fetchCommunityPosts,
  fetchReplies,
  type CommunityPost,
  type CommunityReply,
} from '@/lib/community';

type Props = { navigate: NavigateFn };

function formatWhen(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function CommunityPage({ navigate }: Props) {
  const { user, loading: authLoading, canUseCommunity } = useAuth();
  const isMember = canUseCommunity;

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posting, setPosting] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, CommunityReply[]>>({});
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});
  const [busyReply, setBusyReply] = useState<string | null>(null);

  useSEO({
    title: 'Community · Fempire.Love',
    description: 'The closed Fempire.Love member circle: ask, share, and show up for each other.',
    canonical: '/community',
  });

  const load = useCallback(async () => {
    if (!isMember) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setPosts(await fetchCommunityPosts());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the community.');
    } finally {
      setLoading(false);
    }
  }, [isMember]);

  useEffect(() => {
    if (!authLoading) load();
  }, [authLoading, load]);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setPosting(true);
    setError(null);
    try {
      await createPost({ title, body });
      setTitle('');
      setBody('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post.');
    } finally {
      setPosting(false);
    }
  };

  const toggleReplies = async (postId: string) => {
    if (openId === postId) {
      setOpenId(null);
      return;
    }
    setOpenId(postId);
    if (!replies[postId]) {
      try {
        const list = await fetchReplies(postId);
        setReplies((prev) => ({ ...prev, [postId]: list }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load replies.');
      }
    }
  };

  const onReply = async (postId: string) => {
    const text = (replyDraft[postId] || '').trim();
    if (!text) return;
    setBusyReply(postId);
    try {
      const reply = await createReply(postId, text);
      setReplies((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), reply],
      }));
      setReplyDraft((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reply.');
    } finally {
      setBusyReply(null);
    }
  };

  const onDelete = async (postId: string) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete.');
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center">
        <p className="text-soft text-sm">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-[560px] mx-auto px-[22px] pt-[60px] pb-20 text-center">
        <EyebrowChip className="mb-5">Community</EyebrowChip>
        <h1 className="font-display font-bold text-[clamp(32px,5vw,46px)] tracking-tight mb-4">
          Sign in to enter the Circle
        </h1>
        <p className="text-soft text-[15.5px] leading-[1.7] mb-8">
          The community is for Community and Premium members. Start free, then upgrade when you are
          ready.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => navigate('/account?next=/community')}>Sign in</Button>
          <Button variant="glass" onClick={() => navigate('/membership')}>
            See membership
          </Button>
        </div>
      </main>
    );
  }

  if (!isMember) {
    return (
      <main className="max-w-[560px] mx-auto px-[22px] pt-[60px] pb-20 text-center">
        <EyebrowChip className="mb-5">Members only</EyebrowChip>
        <h1 className="font-display font-bold text-[clamp(32px,5vw,46px)] tracking-tight mb-4">
          Your seat is one upgrade away
        </h1>
        <p className="text-soft text-[15.5px] leading-[1.7] mb-8">
          Community ($10 / mo) unlocks the closed Circle and live Q&amp;A. Premium adds quarterly
          coaching too.
        </p>
        <Button onClick={() => navigate('/membership')}>Join Community</Button>
      </main>
    );
  }

  return (
    <main className="max-w-site mx-auto px-[22px] pt-[50px] pb-20">
      <EyebrowChip className="mb-5">Founding Circle</EyebrowChip>
      <h1 className="font-display font-bold text-[clamp(32px,5vw,48px)] tracking-tight mb-3 max-w-[640px]">
        Ask. Share. Show up for each other.
      </h1>
      <p className="text-soft text-[15.5px] leading-[1.7] max-w-[520px] mb-10">
        This is our own member room on Fempire.Love. Warm, private, and built for the women in this
        Circle. Monthly Q&amp;A threads will live here too.
      </p>

      <GlassPanel className="p-6 sm:p-8 mb-8">
        <h2 className="font-display font-bold text-lg mb-4">Start a conversation</h2>
        <form className="flex flex-col gap-3" onSubmit={onCreate}>
          <input
            className="field-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            required
          />
          <textarea
            className="field-input min-h-[120px] resize-y"
            placeholder="What is on your mind, lovely?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={4000}
            required
          />
          <div className="flex justify-end">
            <Button type="submit" size="small" disabled={posting}>
              {posting ? 'Posting…' : 'Post'}
            </Button>
          </div>
        </form>
      </GlassPanel>

      {error && (
        <p className="text-sm mb-4" style={{ color: 'var(--bougain)' }}>
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-soft text-sm">Loading conversations…</p>
      ) : posts.length === 0 ? (
        <GlassPanel className="p-8 text-center">
          <p className="text-soft m-0">
            No posts yet. You are early. Be the first voice in the room.
          </p>
        </GlassPanel>
      ) : (
        <div className="flex flex-col gap-3.5">
          {posts.map((post) => (
            <GlassPanel key={post.id} className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  {post.pinned && (
                    <span className="text-[11px] font-bold uppercase tracking-wide text-mustard-hi">
                      Pinned
                    </span>
                  )}
                  <h3 className="font-display font-bold text-xl m-0 leading-[1.25]">{post.title}</h3>
                  <p className="text-[12.5px] text-soft-2 m-0 mt-1">
                    {post.author_name} · {formatWhen(post.created_at)}
                  </p>
                </div>
                {user.id === post.author_id && (
                  <button
                    type="button"
                    className="text-[12px] text-soft-2 hover:text-cream"
                    onClick={() => onDelete(post.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-soft text-[15px] leading-[1.7] whitespace-pre-wrap m-0 mb-4">
                {post.body}
              </p>
              <button
                type="button"
                className="btn-glass small"
                onClick={() => toggleReplies(post.id)}
              >
                {openId === post.id ? 'Hide replies' : 'Replies'}
              </button>

              {openId === post.id && (
                <div className="mt-5 pt-5 flex flex-col gap-3" style={{ borderTop: '1px solid var(--glass-b)' }}>
                  {(replies[post.id] || []).map((r) => (
                    <div key={r.id} className="pl-3" style={{ borderLeft: '2px solid rgba(255,92,138,0.35)' }}>
                      <p className="text-[12px] text-soft-2 m-0 mb-1">
                        {r.author_name} · {formatWhen(r.created_at)}
                      </p>
                      <p className="text-soft text-sm leading-[1.65] m-0 whitespace-pre-wrap">{r.body}</p>
                    </div>
                  ))}
                  {(replies[post.id] || []).length === 0 && (
                    <p className="text-soft-2 text-sm m-0">No replies yet. Add the first one.</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <input
                      className="field-input flex-1"
                      placeholder="Write a reply…"
                      value={replyDraft[post.id] || ''}
                      onChange={(e) =>
                        setReplyDraft((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                    />
                    <Button
                      size="small"
                      disabled={busyReply === post.id}
                      onClick={() => onReply(post.id)}
                    >
                      {busyReply === post.id ? 'Sending…' : 'Reply'}
                    </Button>
                  </div>
                </div>
              )}
            </GlassPanel>
          ))}
        </div>
      )}
    </main>
  );
}
