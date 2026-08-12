import { useEffect, useState } from "react";
import { useContactContent, useSaveContact } from "@/hooks/useAdminData";
import { DEFAULT_CONTACT, type ContactContent } from "@/hooks/usePublicContact";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const AdminContato = () => {
  useEffect(() => { document.title = "Contato | Admin"; }, []);
  const { data, isLoading } = useContactContent();
  const save = useSaveContact();
  const [form, setForm] = useState<ContactContent>(DEFAULT_CONTACT);

  useEffect(() => {
    if (data) setForm({ ...DEFAULT_CONTACT, ...data });
  }, [data]);

  const onSave = async () => {
    try {
      const cleaned: ContactContent = {
        ...form,
        phone_whatsapp: form.phone_whatsapp.replace(/\D/g, ""),
        phone_financeiro_whatsapp: form.phone_financeiro_whatsapp.replace(/\D/g, ""),
        phone_pedagogico_whatsapp: form.phone_pedagogico_whatsapp.replace(/\D/g, ""),
      };
      await save.mutateAsync(cleaned);
      toast.success("Informações de contato atualizadas");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Informações de contato</h1>
        <p className="text-sm text-muted-foreground">
          Edite os dados exibidos no rodapé e usados nos botões do WhatsApp.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contato</CardTitle>
          <CardDescription>O número do WhatsApp deve incluir código do país (ex: 5531985366321).</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Telefone Consultor (exibido)</Label>
            <Input
              value={form.phone_display}
              onChange={(e) => setForm({ ...form, phone_display: e.target.value })}
              placeholder="(31) 98536-6321"
            />
          </div>
          <div>
            <Label>WhatsApp Consultor (somente dígitos)</Label>
            <Input
              value={form.phone_whatsapp}
              onChange={(e) => setForm({ ...form, phone_whatsapp: e.target.value })}
              placeholder="5531985366321"
            />
          </div>
          <div>
            <Label>Telefone Financeiro (exibido)</Label>
            <Input
              value={form.phone_financeiro_display}
              onChange={(e) => setForm({ ...form, phone_financeiro_display: e.target.value })}
              placeholder="(31) 99632-7041"
            />
          </div>
          <div>
            <Label>WhatsApp Financeiro (somente dígitos)</Label>
            <Input
              value={form.phone_financeiro_whatsapp}
              onChange={(e) => setForm({ ...form, phone_financeiro_whatsapp: e.target.value })}
              placeholder="5531996327041"
            />
          </div>
          <div>
            <Label>Telefone Pedagógico (exibido)</Label>
            <Input
              value={form.phone_pedagogico_display}
              onChange={(e) => setForm({ ...form, phone_pedagogico_display: e.target.value })}
              placeholder="(31) 99988-8289"
            />
          </div>
          <div>
            <Label>WhatsApp Pedagógico (somente dígitos)</Label>
            <Input
              value={form.phone_pedagogico_whatsapp}
              onChange={(e) => setForm({ ...form, phone_pedagogico_whatsapp: e.target.value })}
              placeholder="5531999888289"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>E-mail</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contato@exemplo.com.br"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Localização / atendimento</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Atendimento em todo o Brasil"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={save.isPending} size="lg">
          {save.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Salvar alterações
        </Button>
      </div>
    </div>
  );
};

export default AdminContato;
