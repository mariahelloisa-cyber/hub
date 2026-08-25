-- Security fix: novos usuários nunca recebem 'admin' automaticamente.
-- Antes, se public.user_roles estivesse vazia (reset, exclusão do admin, etc.),
-- o primeiro cadastro público em /admin/login virava admin. Agora todo
-- cadastro recebe apenas 'user'; promoção a admin deve ser manual.
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END $$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;

-- Caso ainda não exista nenhum admin, promova manualmente com:
-- INSERT INTO public.user_roles (user_id, role)
--   SELECT id, 'admin' FROM auth.users WHERE email = 'seu-email@dominio.com'
--   ON CONFLICT (user_id, role) DO NOTHING;
