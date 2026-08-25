import { Clock, Tag, ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Course, formatPrice } from "@/data/courses";
import WhatsAppButton from "./WhatsAppButton";
import { cn } from "@/lib/utils";
import { getAreaPhoto } from "@/lib/areaPhotos";

// Categorias que NÃO devem abrir a página de detalhe (apenas WhatsApp).
// Qualquer outra categoria (incluindo as criadas pelo admin) abre "Saiba mais".
const WHATSAPP_ONLY_CATEGORIES = new Set<string>([]);

interface CourseCardProps {
  course: Course;
  /** Card bem enxuto, sem descrição — usado nos secundários da home ("Cursos em destaque"). */
  compact?: boolean;
  /** Card de tamanho médio com descrição visível — usado no catálogo (/cursos). */
  catalog?: boolean;
  /** Card grande de destaque — usado no card principal da home. */
  featured?: boolean;
}

const CourseCard = ({ course, compact = false, catalog = false, featured = false }: CourseCardProps) => {
  const isAcademic = !WHATSAPP_ONLY_CATEGORIES.has(course.category);
  const displayImage = course.image ?? getAreaPhoto(course.name, course.area, course.category);
  const small = compact || catalog;

  const ctaClasses = cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-lg font-semibold",
    "bg-primary text-primary-foreground shadow-cta",
    "transition-[transform,background-color,box-shadow] duration-300",
    "hover:-translate-y-0.5 hover:bg-primary/90",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    featured ? "mt-6 px-6 py-3.5 text-base" : small ? "mt-4 px-3.5 py-2.5 text-sm" : "mt-5 px-6 py-3 text-base",
  );

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border bg-card shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        featured || small ? "rounded-[20px]" : "rounded-xl",
        course.highlight ? "border-accent ring-1 ring-accent/40" : "border-border",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          compact ? "aspect-[2/1]" : catalog ? "aspect-[16/9]" : "aspect-[16/10]",
        )}
      >
        <img
          src={displayImage}
          alt={course.name}
          loading="lazy"
          width={1024}
          height={640}
          className={cn(
            "h-full w-full object-cover transition-transform group-hover:scale-105",
            featured || small ? "duration-300" : "duration-500",
          )}
        />
        {course.highlight && (
          <span
            className={cn(
              "absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent font-bold uppercase tracking-wider text-accent-foreground shadow-soft",
              featured ? "px-3.5 py-1.5 text-xs" : small ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
            )}
          >
            {featured && <Flame className="h-3.5 w-3.5" />}
            {featured ? "Mais vendido" : "Mais procurado"}
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "p-7" : catalog ? "px-3.5 py-4" : compact ? "p-3" : "p-6",
        )}
      >
        {course.area && (
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Tag className="h-3.5 w-3.5" />
            {course.area}
          </div>
        )}

        <h3
          className={cn(
            "font-display font-bold text-foreground",
            featured
              ? "mt-3 text-2xl md:text-3xl"
              : catalog
                ? "mt-2 text-base leading-snug"
                : compact
                  ? "mt-1 text-sm leading-snug"
                  : "mt-3 text-xl",
          )}
        >
          {course.name}
        </h3>
        {!compact && (
          <p
            className={cn(
              "leading-relaxed text-muted-foreground",
              featured ? "mt-2 line-clamp-2 text-base" : catalog ? "mt-1.5 line-clamp-3 flex-1 text-sm" : "mt-2 flex-1",
            )}
          >
            {course.description ?? "Curso técnico reconhecido. Fale com um consultor para mais informações sobre matrícula e início das aulas."}
          </p>
        )}

        <div
          className={cn(
            "flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground",
            featured ? "mt-5 text-sm" : catalog ? "mt-3 text-xs" : compact ? "mt-1.5 flex-1 text-xs" : "mt-5 text-sm",
          )}
        >
          <span className="inline-flex items-center gap-2">
            <Clock className={featured ? "h-4 w-4" : small ? "h-3.5 w-3.5" : "h-4 w-4"} />
            Duração: {course.duration}
          </span>
          {course.workload && (
            <span className="inline-flex items-center gap-2">
              <Tag className={featured ? "h-4 w-4" : small ? "h-3.5 w-3.5" : "h-4 w-4"} />
              {course.workload}
            </span>
          )}
        </div>

        {typeof course.price === "number" && (
          <div
            className={cn(
              "border-t border-border",
              featured ? "mt-5 pt-5" : catalog ? "mt-3 pt-3" : compact ? "mt-2 pt-2" : "mt-5 pt-5",
            )}
          >
            <p className="text-xs font-medium text-muted-foreground">A partir de</p>
            <p
              className={cn(
                "font-display font-bold text-primary",
                featured ? "text-4xl" : small ? "text-lg" : "text-3xl",
              )}
            >
              {formatPrice(course.price)}
              <span className="text-sm font-medium text-muted-foreground">/mês</span>
            </p>
          </div>
        )}

        {isAcademic ? (
          <Link to={`/cursos/${course.id}`} className={ctaClasses}>
            {featured ? "Conhecer o curso" : "Saiba mais"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <WhatsAppButton
            className={featured ? "mt-6 w-full" : small ? "mt-4 w-full" : "mt-5 w-full"}
            message={`Olá! Tenho interesse no curso ${course.name}. Gostaria de mais informações.`}
          >
            Quero me inscrever
          </WhatsAppButton>
        )}
      </div>
    </article>
  );
};

export default CourseCard;
