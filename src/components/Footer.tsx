import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { usePublicContact, DEFAULT_CONTACT } from "@/hooks/usePublicContact";

const Footer = () => {
  const { data } = usePublicContact();
  const contact = data ?? DEFAULT_CONTACT;
  return (
    <footer className="bg-[hsl(212_76%_7%)] py-14 text-white">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-display text-lg font-bold">Hub Edu</p>
                <p className="text-xs text-white/70">Educação Profissional EAD</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Há mais de 12 anos transformando vidas por meio da educação técnica
              a distância em todo o Brasil.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>{contact.phone_display} <span className="text-white/60">· Consultor</span></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>{contact.phone_financeiro_display} <span className="text-white/60">· Financeiro</span></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>{contact.phone_pedagogico_display} <span className="text-white/60">· Pedagógico</span></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>{contact.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Navegação</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#beneficios" className="text-white/80 hover:text-accent transition-colors">Benefícios</a></li>
              <li><a href="#cursos" className="text-white/80 hover:text-accent transition-colors">Cursos</a></li>
              <li><a href="#depoimentos" className="text-white/80 hover:text-accent transition-colors">Depoimentos</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Hub Edu. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
