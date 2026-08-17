import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const { ref, inView } = useInView();
  const skipAnimation = prefersReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        !skipAnimation && "transition-all duration-700 ease-out",
        !skipAnimation && (inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"),
        className,
      )}
      style={!skipAnimation ? { transitionDelay: inView ? `${delay}ms` : "0ms" } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
