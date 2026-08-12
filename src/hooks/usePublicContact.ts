import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContactContent {
  phone_display: string; // Consultor - usado nos botões de WhatsApp do site
  phone_whatsapp: string; // digits only, with country code, e.g. 5531985366321
  phone_financeiro_display: string;
  phone_financeiro_whatsapp: string;
  phone_pedagogico_display: string;
  phone_pedagogico_whatsapp: string;
  email: string;
  location: string;
}

export const DEFAULT_CONTACT: ContactContent = {
  phone_display: "(31) 98536-6321",
  phone_whatsapp: "5531985366321",
  phone_financeiro_display: "(31) 99632-7041",
  phone_financeiro_whatsapp: "5531996327041",
  phone_pedagogico_display: "(31) 99988-8289",
  phone_pedagogico_whatsapp: "5531999888289",
  email: "contato@hubedu.com.br",
  location: "Atendimento em todo o Brasil",
};

export const usePublicContact = () => {
  const qc = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`public_contact_changes_${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content", filter: "key=eq.contact" },
        () => {
          qc.invalidateQueries({ queryKey: ["public_contact"] });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return useQuery({
    queryKey: ["public_contact"],
    queryFn: async (): Promise<ContactContent> => {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", "contact")
        .maybeSingle();
      if (error) throw error;
      const v = (data?.value ?? null) as Partial<ContactContent> | null;
      return { ...DEFAULT_CONTACT, ...(v ?? {}) };
    },
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
