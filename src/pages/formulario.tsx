import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { buildWhatsAppLink } from "@/components/WhatsAppButton";
import { usePublicContact } from "@/hooks/usePublicContact";

// --- Componentes auxiliares com a propriedade 'name' adicionada ---
const Field = ({ label, required, placeholder, type = "text", name }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-slate-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
);

const SelectField = ({ label, required, options, name }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-slate-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      required={required}
      name={name}
      defaultValue=""
      className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <option value="" disabled>
        Selecione
      </option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
    <div className="bg-[hsl(209_74%_14%)] px-5 py-3">
      <h2 className="text-sm font-bold uppercase text-white">{title}</h2>
    </div>
    <div className="p-5 md:p-6">{children}</div>
  </div>
);

// --- Componente Principal ---
const Formulario = () => {
  const { data: contact } = usePublicContact();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Captura automática de todos os campos usando o 'name'
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Montando a mensagem com formatação para o WhatsApp
    const message = 
      `Olá! Gostaria de enviar uma nova matrícula:\n\n` +
      `*============ CURSO ============*\n` +
      `*Curso:* ${data.curso}\n` +
      `*Responsável:* ${data.responsavel}\n\n` +
      `*============ DADOS PESSOAIS ============*\n` +
      `*Nome:* ${data.nomeCompleto}\n` +
      `*CPF:* ${data.cpf}\n` +
      `*Data de Nasc.:* ${data.dataNascimento}\n` +
      `*RG:* ${data.rg} (${data.orgaoEmissor})\n` +
      `*Emissão RG:* ${data.dataEmissao || "Não informada"}\n` +
      `*Naturalidade:* ${data.naturalidade}\n` +
      `*Raça/Cor:* ${data.raca || "Não informada"}\n` +
      `*Estado Civil:* ${data.estadoCivil}\n\n` +
      `*============ FILIAÇÃO ============*\n` +
      `*Pai:* ${data.pai || "Não informado"}\n` +
      `*Mãe:* ${data.mae || "Não informada"}\n\n` +
      `*============ ENDEREÇO ============*\n` +
      `*CEP:* ${data.cep}\n` +
      `*Endereço:* ${data.rua}, Nº ${data.numero}\n` +
      `*Complemento:* ${data.complemento || "Nenhum"}\n` +
      `*Bairro:* ${data.bairro}\n` +
      `*Cidade/UF:* ${data.cidade} - ${data.estado}\n\n` +
      `*============ CONTATOS ============*\n` +
      `*Telefone:* ${data.telefone}\n` +
      `*E-mail:* ${data.email}\n\n` +
      `*============ OBSERVAÇÕES ============*\n` +
      `${data.observacoes || "Nenhuma"}\n\n` +
      `_(Nota: Os documentos anexados serão enviados na sequência deste chat)_`;

    // Dispara para o WhatsApp integrado do seu hook de contato
    window.open(buildWhatsAppLink(message, contact?.phone_whatsapp), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans antialiased">
      <Header />

      <main className="container mx-auto max-w-5xl px-4 py-10">
        {/* Banner com Imagem Única centralizada */}
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-center p-6">
          </div>
          <div className="h-1.5 w-full bg-gradient-to-r from-[hsl(209_74%_14%)] via-[hsl(22_90%_50%)] to-[hsl(16_65%_37%)]"></div>
        </div>

        {/* Título da Página */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-extrabold text-foreground md:text-4xl">
            Formulário de Matrícula
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Preencha todos os campos obrigatórios para darmos início a sua matrícula.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mx-auto w-full">
          {/* SELEÇÃO DO CURSO */}
          <FormSection title="Seleção do Curso e do Responsável">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Curso" name="curso" required placeholder="Digite o curso" />
              <Field label="Responsável pela matrícula" name="responsavel" required placeholder="Digite o responsável" />
            </div>
          </FormSection>

          {/* DADOS PESSOAIS */}
          <FormSection title="Dados Pessoais">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="md:col-span-3">
                <Field label="Nome Completo" name="nomeCompleto" required placeholder="Digite o nome completo" />
              </div>
              <Field label="CPF" name="cpf" required placeholder="000.000.000-00" />
              <Field label="Data de Nascimento" name="dataNascimento" required type="date" />
              <Field label="RG" name="rg" required placeholder="Digite o RG" />

              <Field label="Órgão Emissor" name="orgaoEmissor" required placeholder="Ex.: SSP/SP" />
              <Field label="Data de Emissão" name="dataEmissao" type="date" />
              <Field label="Naturalidade" name="naturalidade" required placeholder="Ex.: São Paulo, SP" />

              <SelectField
                label="Raça/Cor"
                name="raca"
                options={["Branca", "Preta", "Parda", "Amarela", "Indígena"]}
              />
              <SelectField
                label="Estado Civil"
                name="estadoCivil"
                required
                options={["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"]}
              />
            </div>
          </FormSection>

          {/* FILIAÇÃO */}
          <FormSection title="Filiação">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Pai" name="pai" placeholder="Nome completo do pai" />
              <Field label="Mãe" name="mae" placeholder="Nome completo da mãe" />
            </div>
          </FormSection>

          {/* ENDEREÇO */}
          <FormSection title="Endereço">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <Field label="CEP" name="cep" required placeholder="00000-000" />
              <Field label="Rua" name="rua" required placeholder="Digite a rua" />
              <Field label="Número" name="numero" required placeholder="Digite o número" />

              <Field label="Complemento" name="complemento" placeholder="Apartamento, bloco, etc." />
              <Field label="Bairro" name="bairro" required placeholder="Digite o bairro" />
              <Field label="Cidade" name="cidade" required placeholder="Digite a cidade" />

              <SelectField
                label="Estado"
                name="estado"
                required
                options={[
                  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
                  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                ]}
              />
            </div>
          </FormSection>

          {/* CONTATOS */}
          <FormSection title="Contatos">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Telefone" name="telefone" required placeholder="(00) 00000-0000" />
              <Field label="E-mail" name="email" required type="email" placeholder="exemplo@dominio.com" />
            </div>
          </FormSection>

          {/* DOCUMENTOS E OBSERVAÇÕES */}
          <FormSection title="Documentos e Observações">
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Anexos complementares
                </label>
                <input
                  type="file"
                  multiple
                  className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-slate-200"
                />
                <p className="mt-2 text-xs text-slate-500">
                  RG, CPF e outros documentos. Limite de 10MB por arquivo.
                </p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Observações do atendimento
                </label>
                <textarea
                  name="observacoes"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  rows={4}
                  placeholder="Adicione observações úteis sobre a matrícula ou os documentos."
                ></textarea>
              </div>
            </div>
          </FormSection>

          {/* BOTÕES DE AÇÃO */}
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 md:flex-row">
            <button
              type="reset"
              className="rounded-md border border-slate-300 bg-white px-8 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Limpar
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Enviar matrícula
            </button>
          </div>
        </form>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Formulario;