-- Remove cursos e categorias de Bacharelado, Superior sequencial, Mestrado e Pós-graduação
DELETE FROM public.courses
  WHERE category_slug IN ('bacharelado', 'superior-sequencial', 'mestrado', 'pos-graduacao');

DELETE FROM public.categories
  WHERE slug IN ('bacharelado', 'superior-sequencial', 'mestrado', 'pos-graduacao');
