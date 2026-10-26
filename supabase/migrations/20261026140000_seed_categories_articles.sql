/*
Seed launch categories + 10 core FAQ-style articles for Fempire.Love.
*/

-- Categories (8 themes: 5 core + did-you-know, women-in-history, tech-for-women)
INSERT INTO categories (id, slug, name, description, sort_order, glow_color, orb_gradient) VALUES
  ('a1000001-0001-4000-8000-000000000001', 'hormones-cycle', 'Hormones & Cycle', 'What really happens in your body, in plain language — including Queenerty energy.', 1, 'rgba(255,92,138,0.55)', 'radial-gradient(circle at 30% 30%, #FF9EBB, #FF5C8A)'),
  ('a1000001-0001-4000-8000-000000000002', 'the-change', 'The Change', 'Perimenopause, menopause, and the first signs no one warned you about.', 2, 'rgba(198,138,46,0.55)', 'radial-gradient(circle at 30% 30%, #E3B564, #C68A2E)'),
  ('a1000001-0001-4000-8000-000000000003', 'motherhood', 'Motherhood', 'From pregnancy to mothering at a distance — without judgement.', 3, 'rgba(242,120,156,0.55)', 'radial-gradient(circle at 30% 30%, #F4C6D3, #F2789C)'),
  ('a1000001-0001-4000-8000-000000000004', 'mind-wellness', 'Mind & Wellness', 'Burnout, anxiety, boundaries, and pragmatic exercises for mental peace.', 4, 'rgba(158,19,69,0.55)', 'radial-gradient(circle at 30% 30%, #F2789C, #9E1345)'),
  ('a1000001-0001-4000-8000-000000000005', 'body-wisdom', 'Body Wisdom', 'Food, sleep, heat, and movement from a Caribbean women''s perspective.', 5, 'rgba(244,198,211,0.55)', 'radial-gradient(circle at 30% 30%, #FFFFFF, #F4C6D3)'),
  ('a1000001-0001-4000-8000-000000000006', 'did-you-know', 'Did You Know', 'Short knowledge drops — the newsletter spirit in article form.', 6, 'rgba(227,181,100,0.45)', 'radial-gradient(circle at 30% 30%, #E3B564, #9E1345)'),
  ('a1000001-0001-4000-8000-000000000007', 'women-in-history', 'Women in History', 'Stories that matter for our lives — Caribbean and beyond.', 7, 'rgba(255,92,138,0.4)', 'radial-gradient(circle at 30% 30%, #FF9EBB, #601733)'),
  ('a1000001-0001-4000-8000-000000000008', 'tech-for-women', 'Tech & Business', 'Tools, business tech, and digital confidence for women building.', 8, 'rgba(198,138,46,0.4)', 'radial-gradient(circle at 30% 30%, #C68A2E, #241019)')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  glow_color = EXCLUDED.glow_color,
  orb_gradient = EXCLUDED.orb_gradient;

-- 10 core articles (2 per core theme)
INSERT INTO articles (
  slug, title, category_id, excerpt, body, faq, is_free, reading_time_min,
  author_name, author_bio, status, published_at, updated_at
) VALUES
(
  'why-do-i-feel-so-different-every-week-of-my-cycle',
  'Why do I feel so different every week of my cycle?',
  'a1000001-0001-4000-8000-000000000001',
  'Because your hormones are not a flat line — they rise and fall in a pattern that shapes energy, mood, sleep and appetite. Knowing the week you are in makes the swings feel less like chaos and more like information.',
  '<p>Because your hormones are not a flat line — they rise and fall in a pattern that shapes energy, mood, sleep and appetite. Knowing the week you are in makes the swings feel less like chaos and more like information.</p>
<h2>What is actually changing week to week?</h2>
<p>Estrogen and progesterone move through a roughly four-phase rhythm for most cycling women. Early cycle often feels clearer; mid-cycle can feel social and strong; the luteal phase can bring sensitivity, bloating or lower patience. None of that means you are "failing" — it means your body is doing biology.</p>
<h2>How do I use this without obsessing?</h2>
<p>Track for one or two cycles: sleep, mood, energy, craving. Then plan the hard conversations and deep work for your clearer days when you can, and protect softer days with fewer obligations. This is body wisdom, not a productivity hack.</p>
<p><em>This article is educational, not a diagnosis. If cycles are extremely painful, absent, or disrupting life, speak with a clinician who listens.</em></p>',
  '[{"question":"Is it normal to feel like a different person before my period?","answer":"Many women notice mood and energy shifts in the luteal phase. Extreme distress may need clinical support (for example PMDD screening)."},{"question":"Do Caribbean climates change cycle symptoms?","answer":"Heat, sleep disruption and stress can amplify how symptoms feel. Cool evenings, hydration and rest still matter."}]'::jsonb,
  true, 6, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'what-is-pmdd',
  'What is PMDD?',
  'a1000001-0001-4000-8000-000000000001',
  'PMDD (premenstrual dysphoric disorder) is a severe, cyclical mood condition in the days before menstruation — more than "bad PMS." It is real, diagnosable, and treatable with the right support.',
  '<p>PMDD (premenstrual dysphoric disorder) is a severe, cyclical mood condition in the days before menstruation — more than "bad PMS." It is real, diagnosable, and treatable with the right support.</p>
<h2>How is PMDD different from PMS?</h2>
<p>PMS can be uncomfortable. PMDD often includes intense irritability, depression, anxiety or hopelessness that clearly lifts after bleeding starts. The pattern repeating across cycles is a key clue.</p>
<h2>What should I do if this sounds like me?</h2>
<p>Track symptoms for two cycles, then bring that log to a doctor or mental health professional. You deserve care that takes the cyclical pattern seriously — not a shrug.</p>',
  '[{"question":"Can PMDD exist with irregular cycles?","answer":"Diagnosis is harder when cycles are irregular, but severe premenstrual mood changes still deserve clinical attention."},{"question":"Is PMDD ''all in my head''?","answer":"No. Sensitivity to normal hormone shifts is a recognized medical condition."}]'::jsonb,
  true, 5, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'what-are-the-first-signs-of-perimenopause',
  'What are the first signs of perimenopause?',
  'a1000001-0001-4000-8000-000000000002',
  'Often it is not a dramatic stop — it is irregular cycles, new sleep trouble, hotter nights, mood shifts, or brain fog while you are still getting periods. Perimenopause can start years before the final period.',
  '<p>Often it is not a dramatic stop — it is irregular cycles, new sleep trouble, hotter nights, mood shifts, or brain fog while you are still getting periods. Perimenopause can start years before the final period.</p>
<h2>What counts as an early sign?</h2>
<p>Cycle length changing by a week or more, nightsweats, heart-racing moments, joint stiffness, lower stress tolerance, and vaginal dryness can all appear. Every woman''s mix is different.</p>
<h2>When should I seek care?</h2>
<p>If symptoms disrupt work, relationships or sleep — or if bleeding is very heavy — see a clinician. You do not need to "tough it out" until periods stop completely.</p>',
  '[{"question":"Can perimenopause start in my late 30s?","answer":"Yes for some women. Timing varies; symptoms plus cycle changes matter more than a single age number."},{"question":"Do I need a special blood test?","answer":"Hormone levels fluctuate; clinical history often matters as much as a one-time lab result."}]'::jsonb,
  true, 6, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'can-perimenopause-cause-anxiety-and-brain-fog',
  'Can perimenopause cause anxiety and brain fog?',
  'a1000001-0001-4000-8000-000000000002',
  'Yes. Shifting estrogen can affect sleep, stress chemistry and cognitive sharpness. Anxiety and fog in midlife are common — and they are not a personal failing.',
  '<p>Yes. Shifting estrogen can affect sleep, stress chemistry and cognitive sharpness. Anxiety and fog in midlife are common — and they are not a personal failing.</p>
<h2>Why does my mind feel different?</h2>
<p>Sleep fragmentation from night heat, plus hormone effects on neurotransmitters, can stack. Stress load in this life stage (career, caretaking, diaspora distance) adds more weight.</p>
<h2>What helps in practice?</h2>
<p>Protect sleep coolness, reduce late caffeine, name the anxiety as possibly hormonal to your clinician, and keep a short brain dump list so fog does not become shame. Therapy and medical options both exist.</p>',
  '[{"question":"Will the fog last forever?","answer":"For many women cognition settles after the transition, especially with sleep and support. Persistent fog still deserves medical check-up."},{"question":"Is this depression?","answer":"It can overlap. A professional can help sort hormone-related anxiety from clinical depression."}]'::jsonb,
  true, 5, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'why-do-i-feel-lost-after-becoming-a-mother',
  'Why do I feel lost after becoming a mother?',
  'a1000001-0001-4000-8000-000000000003',
  'Because motherhood rearranges identity, time, body and belonging all at once. Feeling lost does not mean you do not love your child — it means you are human in a huge transition.',
  '<p>Because motherhood rearranges identity, time, body and belonging all at once. Feeling lost does not mean you do not love your child — it means you are human in a huge transition.</p>
<h2>What am I grieving?</h2>
<p>Often the old pace, the uninterrupted self, the career plot, or the version of you who slept. Grief and love can sit in the same room.</p>
<h2>How do I find myself again without guilt?</h2>
<p>Small reclaiming rituals beat grand reinvention: one weekly hour that is yours, one friendship kept warm, one truth told to someone safe. Community helps — isolation makes the fog thicker.</p>',
  '[{"question":"Is this postpartum depression?","answer":"Feeling lost is common; hopelessness, numbness or thoughts of harm need urgent professional care."},{"question":"Does this happen with older children too?","answer":"Yes. Identity shifts continue through school years and mothering from a distance."}]'::jsonb,
  true, 5, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'how-do-you-mother-from-a-distance',
  'How do you mother from a distance?',
  'a1000001-0001-4000-8000-000000000003',
  'With intention, rhythm and less shame. Distance mothering — diaspora, work travel, co-parenting across islands — is real care expressed through calls, rituals and presence when you can be there.',
  '<p>With intention, rhythm and less shame. Distance mothering — diaspora, work travel, co-parenting across islands — is real care expressed through calls, rituals and presence when you can be there.</p>
<h2>What actually keeps the bond warm?</h2>
<p>Predictable check-ins beat rare perfect visits. Shared jokes, voice notes, bedtime stories over video, and showing up for the big days matter more than constant availability.</p>
<h2>How do I handle the guilt?</h2>
<p>Guilt often means you care. Turn it into one concrete action this week instead of a lifelong sentence. You are allowed to build a life in two places.</p>',
  '[{"question":"Will my child resent me?","answer":"Children feel consistency and honesty more than geography. Repair matters when you miss something."},{"question":"What if family judges me?","answer":"Community opinions are loud in Caribbean families. A clear why — and steady care — is your ground."}]'::jsonb,
  true, 5, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'how-do-i-know-if-its-burnout',
  'How do I know if it''s burnout?',
  'a1000001-0001-4000-8000-000000000004',
  'Burnout is more than a busy week. It is chronic exhaustion, cynicism or numbness, and a sense that nothing you do is enough — lasting weeks to months, not bouncing back after one weekend.',
  '<p>Burnout is more than a busy week. It is chronic exhaustion, cynicism or numbness, and a sense that nothing you do is enough — lasting weeks to months, not bouncing back after one weekend.</p>
<h2>What does it feel like in the body?</h2>
<p>Heavy mornings, short fuse, sleep that does not restore, getting sick more often, or scrolling instead of resting. High-achieving women often miss it because they keep performing.</p>
<h2>What is one pragmatic first step?</h2>
<p>Name it out loud to someone safe. Then cut one non-essential demand this week — not forever, just as an experiment. Burnout heals with load reduction and support, not another productivity app.</p>',
  '[{"question":"Is burnout the same as depression?","answer":"They overlap and can co-exist. A clinician can help sort work-related burnout from clinical depression."},{"question":"Can rest alone fix it?","answer":"Rest helps; lasting change usually needs boundary shifts in work, caretaking or both."}]'::jsonb,
  true, 5, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'how-do-i-set-boundaries-without-guilt',
  'How do I set boundaries without guilt?',
  'a1000001-0001-4000-8000-000000000004',
  'By treating a boundary as care, not rejection. Guilt often shows up because you were trained to keep everyone comfortable. A clear, kind no is still love — including love for yourself.',
  '<p>By treating a boundary as care, not rejection. Guilt often shows up because you were trained to keep everyone comfortable. A clear, kind no is still love — including love for yourself.</p>
<h2>What does a simple boundary sound like?</h2>
<p>"I can''t take that on this week." "I''m free Sunday, not tonight." No essay required. Soft voice, firm content.</p>
<h2>What if they push back?</h2>
<p>Pushback means the old pattern is being interrupted — not that you are cruel. Repeat once, then stop negotiating your nervous system away.</p>
<p><strong>Pragmatic exercise:</strong> Write three yeses you resent. Convert one into a scripted no this week. Notice the guilt without obeying it.</p>',
  '[{"question":"Are boundaries selfish in family culture?","answer":"Caribbean family closeness is beautiful; self-erasure is not required to belong."},{"question":"What if I lose people?","answer":"Some relationships only worked on your over-giving. Grief can come with healthier limits."}]'::jsonb,
  true, 5, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'how-does-heat-affect-hot-flashes-and-sleep',
  'How does heat affect hot flashes and sleep?',
  'a1000001-0001-4000-8000-000000000005',
  'Heat can trigger or intensify hot flashes and fragment sleep — especially in Caribbean nights without cool air. Cooling the room and the body often helps more than white-knuckling through it.',
  '<p>Heat can trigger or intensify hot flashes and fragment sleep — especially in Caribbean nights without cool air. Cooling the room and the body often helps more than white-knuckling through it.</p>
<h2>Why does island heat hit harder in The Change?</h2>
<p>Thermoregulation is already shifting. External heat stacks on internal surges. Alcohol, spicy late meals and stress can add more sparks.</p>
<h2>What can I try tonight?</h2>
<p>Breathable layers, a fan aimed at the bed, cool shower before sleep, water by the bed, and lighter evening meals. If flashes are severe, talk to a clinician about options — you do not have to wait for "worse."</p>',
  '[{"question":"Is AC the only solution?","answer":"No, but airflow and evaporative cooling help a lot where AC is limited or expensive."},{"question":"Can daytime heat ruin nighttime sleep?","answer":"Yes. Overheating by day raises stress load; shade, hydration and rest windows matter."}]'::jsonb,
  true, 5, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
),
(
  'eating-for-your-hormones-with-caribbean-food',
  'Eating for your hormones with Caribbean food',
  'a1000001-0001-4000-8000-000000000005',
  'You do not need a foreign "wellness" plate. Beans, greens, ground provisions, fish, fruit and spices already give fiber, minerals and steady energy — the foundations hormones lean on.',
  '<p>You do not need a foreign "wellness" plate. Beans, greens, ground provisions, fish, fruit and spices already give fiber, minerals and steady energy — the foundations hormones lean on.</p>
<h2>What should stay on my plate?</h2>
<p>Fiber-rich sides (peas and beans, callaloo, cabbage), protein you enjoy, colorful fruit, and cooked meals that feel like home. Ultra-processed snacks can spike energy crashes that feel hormonal.</p>
<h2>What about comfort food?</h2>
<p>Keep joy. Shift portions and timing rather than banning culture from your kitchen. Consistency beats perfection — especially in busy Caribbean households.</p>',
  '[{"question":"Do I need expensive supplements first?","answer":"Food patterns and sleep usually come first; supplements are personal and clinician-guided."},{"question":"Is cutting carbs required?","answer":"Not for most women. Quality and balance matter more than deleting ground provisions."}]'::jsonb,
  true, 6, 'Fempire.Love Editorial', 'Warm, evidence-aware writing for Caribbean women and the diaspora.', 'published', now(), now()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  faq = EXCLUDED.faq,
  category_id = EXCLUDED.category_id,
  updated_at = now(),
  status = 'published';
