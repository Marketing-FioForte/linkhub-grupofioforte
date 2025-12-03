-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert hub config" ON public.hub_config;
DROP POLICY IF EXISTS "Authenticated users can update hub config" ON public.hub_config;

-- Create admin-only policies
CREATE POLICY "Admins can insert hub config" ON public.hub_config
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hub config" ON public.hub_config
  FOR UPDATE TO authenticated 
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Also secure hub_config_history - only admins can insert
DROP POLICY IF EXISTS "Authenticated users can insert history" ON public.hub_config_history;

CREATE POLICY "Admins can insert history" ON public.hub_config_history
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));

-- Restrict history viewing to admins only
DROP POLICY IF EXISTS "Anyone can view config history" ON public.hub_config_history;

CREATE POLICY "Admins can view config history" ON public.hub_config_history
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));