-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text,
  role text DEFAULT 'user'::text CHECK (role = ANY (ARRAY['user'::text, 'admin'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.screening_results (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  total_score integer NOT NULL,
  category text NOT NULL,
  answers jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT screening_results_pkey PRIMARY KEY (id),
  CONSTRAINT screening_results_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);