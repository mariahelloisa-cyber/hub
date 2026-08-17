import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogFallbackImage } from "@/hooks/useBlogPosts";

export interface BlogCardData {
  slug: string;
  title: string;
  excerpt?: string | null;
  image_url?: string | null;
  created_at?: string;
  dateLabel?: string;
  tag?: string;
}

interface BlogCardProps {
  post: BlogCardData;
}

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

const BlogCard = ({ post }: BlogCardProps) => {
  const dateText = post.dateLabel ?? formatDate(post.created_at);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-secondary/60 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image_url || blogFallbackImage}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
            {post.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {(dateText || post.tag) && (
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            {dateText && <span>{dateText}</span>}
            {dateText && post.tag && <span aria-hidden>·</span>}
            {post.tag && (
              <span className="font-semibold uppercase tracking-wide text-primary">{post.tag}</span>
            )}
          </div>
        )}

        <h3 className="mb-3 font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-xl">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mb-6 line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary transition-all group-hover:gap-2.5">
            Ler matéria completa <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
