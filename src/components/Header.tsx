import { Link, useNavigate } from "react-router-dom";
import { Search, Shield } from "lucide-react";
import { useState } from "react";
import logoHubEdu from "@/assets/logo-hub-edu.png";
import WhatsAppButton from "./WhatsAppButton";

const Header = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/cursos?q=${encodeURIComponent(term)}` : "/cursos");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background text-foreground border-b border-border shadow-soft">
      <div className="container flex h-20 items-center gap-6">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logoHubEdu} alt="Hub Edu" className="h-12 w-auto rounded-lg" />
        </Link>

        <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-md" role="search">
          <label className="flex w-full items-center gap-2 rounded-full bg-muted px-4 py-2.5 text-sm text-muted-foreground ring-1 ring-border focus-within:ring-primary/60">
            <button type="submit" aria-label="Buscar" className="shrink-0">
              <Search className="h-4 w-4" />
            </button>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar cursos"
              className="w-full bg-transparent placeholder:text-muted-foreground outline-none text-foreground"
            />
          </label>
        </form>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link to="/blog" className="text-foreground hover:text-primary transition-colors">Blog</Link>
          <Link to="/cursos" className="text-foreground hover:text-primary transition-colors">Cursos</Link>
          <Link to="/formulario" className="text-foreground hover:text-primary transition-colors">Formulário</Link>
          <Link to="/admin/login" className="text-foreground hover:text-primary transition-colors" title="Admin">
            <Shield className="h-4 w-4" />
          </Link>
        </nav>

        <WhatsAppButton
          variant="compact"
          message="Olá! Quero conhecer os cursos."
          className="!bg-primary !text-primary-foreground hover:!bg-primary/90"
        >
          Fale conosco
        </WhatsAppButton>
      </div>
    </header>
  );
};

export default Header;
