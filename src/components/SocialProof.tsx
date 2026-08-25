import { Star, Quote } from "lucide-react";
import { usePublicTestimonials, DEFAULT_TESTIMONIALS } from "@/hooks/usePublicTestimonials";

const SocialProof = () => {
  const { data } = usePublicTestimonials();
  const testimonials = data?.items?.length ? data.items : DEFAULT_TESTIMONIALS.items;

  return (
    <section id="depoimentos" className="bg-secondary py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Quem já transformou a carreira</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Histórias reais de quem conquistou um novo futuro
          </h2>
        </div>

        <div
          className="group relative mt-12 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div
            className="flex w-max animate-marquee gap-7 group-hover:[animation-play-state:paused]"
            style={{ animationDuration: `${testimonials.length * 4.5}s` }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <article
                key={`${t.name}-${i}`}
                className="relative flex w-[320px] shrink-0 flex-col rounded-xl border border-border bg-card p-7 shadow-card sm:w-[380px]"
              >
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-foreground">"{t.text}"</p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-display font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role} • {t.city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
