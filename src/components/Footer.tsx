import { Link } from "react-router-dom";
import { GraduationCap, Instagram, Facebook, Youtube, Linkedin, Shield } from "lucide-react";
import { usePublicCategories } from "@/hooks/usePublicData";

const institucionalLinks = [
  { label: "Sobre nós", to: "/#beneficios" },
  { label: "Nossos cursos", to: "/cursos" },
  { label: "Blog", to: "/blog" },
  { label: "Fale Conosco", to: "/formulario" },
];

const ajudaLinks = [
  { label: "Perguntas frequentes", to: "#" },
  { label: "Suporte", to: "/formulario" },
  { label: "Política de privacidade", to: "#" },
  { label: "Termos de uso", to: "#" },
];

const socialLinks = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
];

const Footer = () => {
  const { data: categories } = usePublicCategories();
  const cursosLinks = (categories ?? []).filter((c) => !c.slug.startsWith("profissionalizantes"));

  return (
    <footer className="bg-[hsl(212_76%_7%)] pb-6 pt-12 text-white">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-display text-lg font-bold">
                  Hub <span className="text-primary">Edu</span>
                </p>
              </div>
              <Link
                to="/admin"
                title="Admin"
                aria-label="Admin"
                className="text-primary transition-colors hover:text-primary/80"
              >
                <Shield className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Educação que conecta você ao conhecimento e ao mercado de trabalho.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Institucional</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {institucionalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/75 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Cursos</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {cursosLinks.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/cursos?categoria=${c.slug}`}
                    className="text-white/75 hover:text-primary transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Ajuda</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {ajudaLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/75 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold">Siga-nos</h3>
            <div className="mt-3 flex gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-white/15 pt-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Hub Edu. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
