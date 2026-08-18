import mecsisImage from "@/assets/mecsis.png";
import mecBadge from "@/assets/meci.png";
import sistecBadge from "@/assets/sisteci.png";

const cards = [
  {
    image: mecBadge,
    label: "Reconhecido pelo",
    highlight: "MEC",
    description: "Cursos autorizados e reconhecidos pelo Ministério da Educação.",
  },
  {
    image: sistecBadge,
    label: "Aprovado pelo",
    highlight: "Sistec",
    description: "Certificação válida em todo o Brasil, garantindo mais oportunidades para o seu futuro.",
  },
];

const Recognition = () => {
  return (
    <section className="bg-background pb-0 pt-0">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Cursos reconhecidos <br />
              pelo <span className="text-primary">MEC</span> e <br />
              <span className="text-primary">Sistec </span>
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Nossos cursos seguem os mais altos padrões de qualidade e são reconhecidos pelo Ministério da Educação e pelo Sistec.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {cards.map(({ image, label, highlight, description }) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft"
                >
                  <img src={image} alt={highlight} className="mx-auto h-20 w-auto object-contain" />
                  <p className="mt-3 font-display text-sm font-semibold text-foreground">
                    {label} <span className="text-primary">{highlight}</span>
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 opacity-25 md:block"
              style={{
                backgroundImage: "radial-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
            <img
              src={mecsisImage}
              alt="Aluna Hub Edu com material didático"
              className="relative w-full rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
