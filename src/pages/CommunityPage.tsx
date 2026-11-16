import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { useAuth } from '@/hooks/useAuth';
import { MembershipJoin } from '@/components/MembershipJoin';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import {
  createPost,
  createReply,
  deletePost,
  fetchCommunityPosts,
  fetchCommunityRooms,
  fetchReplies,
  ROOM_CATALOG,
  type CommunityPost,
  type CommunityReply,
  type CommunityRoom,
} from '@/lib/community';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn };

function formatWhen(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function roomSlugFromUrl() {
  return new URLSearchParams(window.location.search).get('room');
}

export function CommunityPage({ navigate }: Props) {
  const { user, loading: authLoading, canUseCommunity } = useAuth();
  const isMember = canUseCommunity;

  const [rooms, setRooms] = useState<CommunityRoom[]>(ROOM_CATALOG);
  const [activeSlug, setActiveSlug] = useState<string | null>(() => roomSlugFromUrl());
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

  const activeRoom = useMemo(
    () => (activeSlug ? rooms.find((r) => r.slug === activeSlug) || null : null),
    [activeSlug, rooms],
  );

  useSEO({
    title: isMember
      ? activeRoom
        ? `${activeRoom.name} · Community · Fempire.Love`
        : 'Community rooms · Fempire.Love'
      : 'Join the Circle · Fempire.Love',
    description: isMember
      ? 'Member rooms on Fempire.Love: talk about anything in the women’s realm.'
      : 'Start free, or join Community ($10/mo) or Premium ($33/mo). The closed Circle lives here.',
    canonical: activeSlug ? `/community?room=${activeSlug}` : '/community',
  });

  const openRoom = (slug: string) => {
    setActiveSlug(slug);
    setOpenId(null);
    setReplies({});
    window.history.pushState({}, '', `/community?room=${slug}`);
  };

  const backToRooms = () => {
    setActiveSlug(null);
    setPosts([]);
    window.history.pushState({}, '', '/community');
  };

  useEffect(() => {
    const onPop = () => setActiveSlug(roomSlugFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const loadRooms = useCallback(async () => {
    if (!isMember) return;
    try {
      setRooms(await fetchCommunityRooms());
    } catch {
      setRooms(ROOM_CATALOG);
    }
  }, [isMember]);

  const loadPosts = useCallback(async () => {
    if (!isMember || !activeRoom) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setPosts(await fetchCommunityPosts(activeRoom.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load this room.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [isMember, activeRoom]);

  useEffect(() => {
    if (!authLoading && isMember) loadRooms();
  }, [authLoading, isMember, loadRooms]);

  useEffect(() => {
    if (!authLoading) loadPosts();
  }, [authLoading, loadPosts]);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRoom || !title.trim() || !body.trim()) return;
    if (activeRoom.id.startsWith('local-')) {
      setError('Rooms are reconnecting. Try again in a moment, or refresh after the live Circle is ready.');
      return;
    }
    setPosting(true);
    setError(null);
    try {
      await createPost({ title, body, roomId: activeRoom.id });
      setTitle('');
      setBody('');
      await loadPosts();
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

  if (!user || !isMember) {
    return (
      <main>
        <MembershipJoin navigate={navigate} context="community" />
        {!user && (
          <div className="max-w-site mx-auto px-[22px] pb-16 text-center">
            <p className="text-soft text-sm m-0 mb-3">Already have a seat?</p>
            <Button variant="glass" size="small" onClick={() => navigate('/account?next=/community')}>
              Sign in
            </Button>
          </div>
        )}
      </main>
    );
  }

  if (activeRoom) {
    return (
      <main className="pb-20">
        <section className="relative overflow-hidden pt-[50px] pb-6">
          <div className="max-w-site mx-auto px-[22px]">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-soft text-sm mb-5 hover:text-cream bg-transparent border-0 p-0 cursor-pointer"
              onClick={backToRooms}
            >
              <ArrowLeft size={16} /> All rooms
            </button>
            <div
              className="relative overflow-hidden rounded-[22px] mb-6"
              style={{ border: '1px solid var(--glass-b)' }}
            >
              <div className="relative h-[140px] sm:h-[180px]">
                <img
                  src={activeRoom.scene || MEDIA.queenCrownStreet}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover scene-ken"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(36,16,25,0.2) 0%, rgba(96,23,51,0.72) 100%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <EyebrowChip className="mb-2">Room</EyebrowChip>
                  <h1 className="font-display font-bold text-[clamp(26px,4vw,40px)] m-0 tracking-tight">
                    {activeRoom.name}
                  </h1>
                  <p className="text-soft text-sm m-0 mt-2 max-w-[520px]">{activeRoom.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-site mx-auto px-[22px]">
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
                No posts yet in this room. You are early. Be the first voice.
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
                    <div
                      className="mt-5 pt-5 flex flex-col gap-3"
                      style={{ borderTop: '1px solid var(--glass-b)' }}
                    >
                      {(replies[post.id] || []).map((r) => (
                        <div
                          key={r.id}
                          className="pl-3"
                          style={{ borderLeft: '2px solid rgba(255,92,138,0.35)' }}
                        >
                          <p className="text-[12px] text-soft-2 m-0 mb-1">
                            {r.author_name} · {formatWhen(r.created_at)}
                          </p>
                          <p className="text-soft text-sm leading-[1.65] m-0 whitespace-pre-wrap">
                            {r.body}
                          </p>
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
        </div>
      </main>
    );
  }

  return (
    <main className="pb-20">
      <section className="relative overflow-hidden pt-[50px] pb-8 text-center">
        <div className="page-hero-wash" aria-hidden />
        <div className="relative z-[1] max-w-site mx-auto px-[22px]">
          <EyebrowChip className="mb-5">Founding Circle</EyebrowChip>
          <h1 className="font-display font-bold text-[clamp(32px,5vw,48px)] tracking-tight mb-3 max-w-[640px] mx-auto">
            Rooms to talk about anything in the women’s realm.
          </h1>
          <p className="text-soft text-[15.5px] leading-[1.7] max-w-[520px] mx-auto m-0">
            Pick a room. Ask, share, show up. Warm, private, and built for the women in this Circle.
          </p>
        </div>
      </section>

      <div className="max-w-site mx-auto px-[22px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => openRoom(room.slug)}
              className="text-left p-0 bg-transparent border-0 cursor-pointer"
            >
              <GlassPanel className="p-0 overflow-hidden h-full transition-transform duration-250 hover:-translate-y-1">
                <div className="relative h-[120px]">
                  <img
                    src={room.scene || MEDIA.queenCrownStreet}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover scene-ken"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(36,16,25,0.05), rgba(36,16,25,0.5))',
                    }}
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display font-bold text-[18px] m-0 mb-2">{room.name}</h2>
                  <p className="text-soft text-[13.5px] leading-[1.65] m-0">{room.description}</p>
                </div>
              </GlassPanel>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
