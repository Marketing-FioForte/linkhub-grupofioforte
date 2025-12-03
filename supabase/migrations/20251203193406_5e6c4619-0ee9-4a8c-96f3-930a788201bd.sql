-- Create hub_config table to store the centralized configuration
CREATE TABLE public.hub_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key TEXT NOT NULL UNIQUE DEFAULT 'main',
  config_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by TEXT
);

-- Enable Row Level Security
ALTER TABLE public.hub_config ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the config (public hub)
CREATE POLICY "Anyone can view hub config" 
ON public.hub_config 
FOR SELECT 
USING (true);

-- Only authenticated users can update (RH admin)
CREATE POLICY "Authenticated users can update hub config" 
ON public.hub_config 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert hub config" 
ON public.hub_config 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Enable realtime for instant updates across devices
ALTER PUBLICATION supabase_realtime ADD TABLE public.hub_config;

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION public.update_hub_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_hub_config_timestamp
BEFORE UPDATE ON public.hub_config
FOR EACH ROW
EXECUTE FUNCTION public.update_hub_config_updated_at();