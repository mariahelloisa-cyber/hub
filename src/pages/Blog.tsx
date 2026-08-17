import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  MessageCircle,
  Search,
  Briefcase,
  TrendingUp,
  Monitor,
  BookMarked,
  Sparkles,
  ChevronRight,
  Mail,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { usePublishedPosts } from "@/hooks/useBlogPosts";
import { blogPosts as fallbackPosts } from "@/data/blog";
import blogHero from "@/assets/blog-hero.png";

const PAGE_SIZE = 4;

const categories = [
  { label: "Carreira", icon: Briefcase },
  { label: "Educação", icon: GraduationCap },
  { label: "Mercado de Trabalho", icon: TrendingUp },
  { label: "Tecnologia", icon: Monitor },
  { label: "Dicas de Estudo", icon: BookMarked },
  { label: "Histórias que Inspiram", icon: Sparkles },
];

const Blog = () => {
  const { data: posts, isLoading } = usePublishedPosts();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [email, setEmail] = useState("");

  const list =
    posts && posts.length > 0
      ? posts
      : fallbackPosts.map((p) => ({
          slug: p.id,
          title: p.title,
          excerpt: p.excerpt,
          image_url: p.image,
          tag: p.tag,
          dateLabel: p.date,
        }));

  const filtered = useMemo(() => {
    return list.filter((post) => {
      const matchQuery = post.title.toLowerCase().includes(query.toLowerCase());
      const matchTag = !activeTag || post.tag?.toLowerCase() === activeTag.toLowerCase();
      return matchQuery && matchTag;
    });
  }, [list, query, activeTag]);

  const paginated = filtered.slice(0, visible);

  const handleCategoryClick = (label: string) => {
    setVisible(PAGE_SIZE);
    setActiveTag((current) => (current === label ? null : label));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: "Inscrição recebida!", description: "Você vai receber nossos próximos conteúdos por e-mail." });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <SubNav />
      <main>
        {/* HERO */}
        <section
          className="relative overflow-hidden bg-[hsl(212_76%_7%)] bg-cover bg-[center_25%]"
          style={{
            backgroundImage: `linear-gradient(hsl(212 76% 7% / 0.84), hsl(212 76% 7% / 0.9)), url(${blogHero})`,
          }}
        >
          {/* dot-grid decoration */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-5 top-5 hidden h-24 w-24 opacity-25 md:block"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
          />

          <div className="container relative py-16 md:py-20">
            <div className="mx-auto max-w-md text-center md:mx-0 md:text-left">
              <span className="mb-2.5 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary ring-1 ring-white/10">
                Blog Hub Edu
              </span>
              <h1 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                Conhecimento que inspira e transforma.
              </h1>
              <svg
                aria-hidden
                viewBox="0 0 220 16"
                className="mt-1.5 h-2 w-28 text-primary"
              >
                <path
                  d="M2 12C40 2 80 2 110 8C140 14 180 14 218 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-3 text-sm text-white/70 md:text-base">
                Conteúdos, dicas e histórias para impulsionar sua jornada de aprendizado e carreira.
              </p>
            </div>

            {/* decorative icon stack */}
            <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
              {[GraduationCap, BookOpen, MessageCircle].map((Icon, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/80"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLES + SIDEBAR */}
        <section className="bg-background py-16 md:py-24">
          <div className="container grid gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <h2 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">
                {activeTag ? `Artigos sobre ${activeTag}` : "Últimos artigos"}
              </h2>

              {isLoading && !posts ? (
                <div className="text-center text-sm text-muted-foreground">Carregando...</div>
              ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">
                    Nenhum artigo encontrado
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Tente ajustar a busca ou selecionar outra categoria.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {paginated.map((post) => (
                      <BlogCard key={post.slug} post={post as any} />
                    ))}
                  </div>

                  {visible < filtered.length && (
                    <div className="mt-10 flex justify-center">
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-primary text-primary hover:bg-primary/10"
                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      >
                        Ver mais artigos <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-6">
              <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border">
                <h3 className="mb-3 font-display text-base font-bold text-foreground">Buscar no blog</h3>
                <label className="flex items-center gap-2 rounded-full bg-muted px-4 py-2.5 text-sm ring-1 ring-border focus-within:ring-primary/60">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Pesquise por temas..."
                    aria-label="Buscar no blog"
                    className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </label>
              </div>

              <div className="rounded-2xl bg-secondary/60 p-5">
                <h3 className="mb-3 font-display text-base font-bold text-foreground">Categorias</h3>
                <ul className="space-y-1">
                  {categories.map(({ label, icon: Icon }) => {
                    const isActive = activeTag === label;
                    return (
                      <li key={label}>
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(label)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-background/70"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="h-4 w-4 text-primary" />
                            {label}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-2xl bg-[hsl(212_76%_7%)] p-6 text-white">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold leading-snug">
                  Receba conteúdos exclusivos no seu e-mail!
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Cadastre-se e receba nossos melhores artigos, dicas e novidades.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-2.5">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    aria-label="Seu melhor e-mail"
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/50 focus-visible:ring-primary"
                  />
                  <Button type="submit" className="w-full rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                    Quero receber
                  </Button>
                </form>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="relative overflow-hidden bg-[hsl(212_76%_7%)] py-10 md:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-primary/30"
          />
          <div className="container relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <BookOpen className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                  Pronto para transformar seu futuro?
                </h3>
                <p className="mt-1 text-sm text-white/70 md:text-base">
                  Conheça nossos cursos e dê o próximo passo rumo aos seus objetivos.
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/cursos">
                Ver cursos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Blog;
