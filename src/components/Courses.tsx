import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { usePublicCourses } from "@/hooks/usePublicData";
import type { Course } from "@/data/courses";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterChip {
  key: string;
  label: string;
  match: (course: Course) => boolean;
}

const FILTERS: FilterChip[] = [
  { key: "todos", label: "Todos", match: () => true },
  { key: "tecnicos", label: "Técnicos", match: (c) => c.category === "cursos-tecnicos" },
  { key: "tecnologos", label: "Tecnólogos", match: (c) => c.category === "tecnologo" },
  { key: "eja", label: "EJA", match: (c) => c.category === "eja" },
  { key: "pos-tecnico", label: "Pós-Técnico", match: (c) => c.category === "pos-tecnico" },
];

const Courses = () => {
  const { data: courses = [] } = usePublicCourses();
  const [activeFilter, setActiveFilter] = useState("todos");

  const pool = useMemo(() => {
    const filter = FILTERS.find((f) => f.key === activeFilter) ?? FILTERS[0];
    const matched = courses.filter(filter.match);
    return [...matched.filter((c) => c.highlight), ...matched.filter((c) => !c.highlight)];
  }, [courses, activeFilter]);

  const main = pool[0];
  const secondaries = pool.slice(1, 5);

  return (
    <section id="cursos" className="bg-background pb-4 pt-6 md:pb-6 md:pt-10">
      <div className="container">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Formações mais procuradas
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">Cursos em destaque</h2>
            <p className="mt-2 max-w-xl text-muted-foreground md:text-lg">
              Encontre uma formação que combina com seus objetivos e comece a transformar seu futuro.
            </p>
          </div>

          <Link
            to="/cursos"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 md:inline-flex"
          >
            Ver todos os cursos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filtros por categoria */}
        <div
          className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
          role="tablist"
          aria-label="Filtrar cursos em destaque por categoria"
        >
          {FILTERS.map((f) => {
            const isActive = f.key === activeFilter;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(f.key)}
                className={cn(
                  "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary hover:text-primary",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Vitrine de cursos */}
        {main ? (
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <CourseCard course={main} featured />
            <div className="grid gap-6 sm:grid-cols-2">
              {secondaries.map((course) => (
                <CourseCard key={course.id} course={course} compact />
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <p className="font-display text-lg font-semibold text-foreground">Nenhum curso encontrado</p>
            <p className="mt-2 text-muted-foreground">Tente selecionar outra categoria.</p>
          </div>
        )}

        {/* CTA final */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <div>
            <p className="font-display text-xl font-bold text-foreground">Ainda não encontrou o que procura?</p>
            <p className="mt-1 text-muted-foreground">
              Explore todas as formações disponíveis e encontre o curso ideal para você.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="font-semibold">
            <Link to="/cursos">
              Explorar todos os cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
