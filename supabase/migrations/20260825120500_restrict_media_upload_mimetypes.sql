-- Reforça no servidor a validação de tipo de arquivo do bucket site-media
-- (a validação no client pode ser contornada com uma chamada direta à API).
DROP POLICY IF EXISTS "Admins upload media" ON storage.objects;
CREATE POLICY "Admins upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'site-media'
    AND public.has_role(auth.uid(), 'admin')
    AND (metadata->>'mimetype') IN ('image/jpeg', 'image/png', 'image/webp', 'image/gif')
  );
