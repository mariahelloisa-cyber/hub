import { Clock, Wallet, Award, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import heroStudent from "@/assets/hero-student.jpg";
import WhatsAppButton from "./WhatsAppButton";

const benefits = [
  {
    icon: Clock,
    title: "Conclusão Rápida",
    description: "Forme-se em até 18 meses, no seu próprio ritmo, conciliando com o trabalho.",
  },
  {
    icon: Wallet,
    title: "Mensalidades Acessíveis",
    description: "Planos a partir de R$ 89,90 sem taxa de matrícula e sem surpresas.",
  },
  {
    icon: Award,
    title: "Reconhecimento Nacional",
    description: "Diploma válido em todo o território brasileiro, aceito por empresas e concursos.",
  },
  {
    icon: Laptop,
    title: "100% Online",
    description: "Aulas, materiais e provas pela internet. Estude pelo celular, tablet ou computador.",
  },
];

const dotPatternStyle = {
  backgroundImage: "radial-gradient(hsl(var(--primary)) 1.5px, transparent 1.5px)",
  backgroundSize: "10px 10px",
};

const Benefits = () => {
  return (
    <section id="beneficios" className="bg-background pb-20 pt-20 md:pb-28 md:pt-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr_1.15fr] lg:gap-12">
          {/* Coluna esquerda: eyebrow, título e texto */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-start-1 lg:row-start-1"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Por que estudar conosco</p>
            <h2 className="mt-3 max-w-sm font-display text-3xl font-bold leading-[1.15] text-foreground lg:text-4xl">
              Vantagens pensadas para quem trabalha e quer crescer
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
              Estrutura completa para que você conquiste seu diploma técnico sem abrir mão da sua rotina.
            </p>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
              Tudo que você precisa para estudar com flexibilidade, segurança e qualidade.
            </p>
          </motion.div>

          {/* Coluna central: foto com elementos decorativos */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:max-w-[300px] lg:self-center"
          >
            <div
              aria-hidden
              className="absolute -right-5 -top-5 h-[90%] w-[90%] rounded-[2rem] bg-primary lg:-right-6 lg:-top-6"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-6 hidden h-24 w-24 opacity-70 sm:block"
              style={dotPatternStyle}
            />
            <img
              src={heroStudent}
              alt="Aluno estudando com apoio da Hub Edu"
              className="relative z-10 aspect-[4/5] w-full rounded-[2rem] object-cover object-[80%_15%] shadow-card-hover"
            />
          </motion.div>

          {/* CTA, abaixo do texto no desktop / abaixo da foto no mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-start"
          >
            <WhatsAppButton
              message="Olá! Quero falar com um consultor sobre os cursos."
            >
              Fale com um consultor
            </WhatsAppButton>
          </motion.div>

          {/* Coluna direita: benefícios em lista vertical */}
          <div className="divide-y divide-border lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:self-center">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
