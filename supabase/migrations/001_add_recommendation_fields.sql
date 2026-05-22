-- Add title and description to recommendations (required by the UI)
ALTER TABLE public.recommendations
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';

-- Add score to audits (health score 0-100, computed by LLM)
ALTER TABLE public.audits
  ADD COLUMN IF NOT EXISTS score int;
