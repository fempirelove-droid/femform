-- Remove em/en dashes from seeded category + article copy (site style: no dashes in content)

UPDATE categories SET
  description = replace(replace(description, '—', ','), '–', ' to ')
WHERE description LIKE '%—%' OR description LIKE '%–%';

UPDATE articles SET
  excerpt = replace(replace(excerpt, '—', '.'), '–', ' to '),
  body = replace(replace(body, '—', '.'), '–', ' to '),
  faq = replace(replace(faq::text, '—', '.'), '–', ' to ')::jsonb,
  updated_at = now()
WHERE excerpt LIKE '%—%'
   OR body LIKE '%—%'
   OR faq::text LIKE '%—%'
   OR excerpt LIKE '%–%'
   OR body LIKE '%–%'
   OR faq::text LIKE '%–%';

-- Tidy doubled punctuation that can appear after crude replace
UPDATE articles SET
  excerpt = replace(replace(excerpt, '..', '.'), '.,', ','),
  body = replace(replace(body, '..', '.'), '.,', ','),
  updated_at = now();
