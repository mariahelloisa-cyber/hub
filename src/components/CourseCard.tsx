import { Clock, Tag, ArrowRight } from "lucide-react";
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
  compact?: boolean;
}

const CourseCard = ({ course, compact = false }: CourseCardProps) => {
  const isAcademic = !WHATSAPP_ONLY_CATEGORIES.has(course.category);
  const displayImage = course.image ?? getAreaPhoto(course.name, course.area, course.category);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        course.highlight ? "border-accent ring-1 ring-accent/40" : "border-border",
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={displayImage}
          alt={course.name}
          loading="lazy"
          width={1024}
          height={640}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {course.highlight && (
          <span
            className={cn(
              "absolute left-4 top-4 inline-flex items-center rounded-full bg-accent font-bold uppercase tracking-wider text-accent-foreground shadow-soft",
              compact ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
            )}
          >
            Mais procurado
          </span>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col", compact ? "p-4" : "p-6")}>
        {course.area && (
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Tag className="h-3.5 w-3.5" />
            {course.area}
          </div>
        )}

        <h3
          className={cn(
            "font-display font-bold text-foreground",
            compact ? "mt-2 text-base leading-snug" : "mt-3 text-xl",
          )}
        >
          {course.name}
        </h3>
        <p
          className={cn(
            "flex-1 leading-relaxed text-muted-foreground",
            compact ? "mt-1.5 line-clamp-2 text-sm" : "mt-2",
          )}
        >
          {course.description ?? "Curso técnico reconhecido. Fale com um consultor para mais informações sobre matrícula e início das aulas."}
        </p>

        <div
          className={cn(
            "flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground",
            compact ? "mt-3 text-xs" : "mt-5 text-sm",
          )}
        >
          <span className="inline-flex items-center gap-2">
            <Clock className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            Duração: {course.duration}
          </span>
          {course.workload && (
            <span className="inline-flex items-center gap-2">
              <Tag className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
              {course.workload}
            </span>
          )}
        </div>

        {typeof course.price === "number" && (
          <div className={cn("border-t border-border", compact ? "mt-3 pt-3" : "mt-5 pt-5")}>
            <p className="text-xs font-medium text-muted-foreground">A partir de</p>
            <p className={cn("font-display font-bold text-primary", compact ? "text-xl" : "text-3xl")}>
              {formatPrice(course.price)}
              <span className="text-sm font-medium text-muted-foreground">/mês</span>
            </p>
          </div>
        )}

        {isAcademic ? (
          <Link
            to={`/cursos/${course.id}`}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-lg font-semibold",
              "bg-primary text-primary-foreground shadow-cta",
              "transition-[transform,background-color,box-shadow] duration-300",
              "hover:-translate-y-0.5 hover:bg-primary/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              compact ? "mt-4 px-4 py-2.5 text-sm" : "mt-5 px-6 py-3 text-base",
            )}
          >
            Saiba mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <WhatsAppButton
            className={compact ? "mt-4 w-full" : "mt-5 w-full"}
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
