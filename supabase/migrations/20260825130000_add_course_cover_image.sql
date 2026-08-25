-- Imagem de capa (banner) exibida no topo da página de detalhe do curso,
-- separada da imagem usada nos cards (image_url).
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS cover_image_url text;
