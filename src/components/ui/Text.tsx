type TextProps = {
  children: React.ReactNode;
  as?: "p" | "h1" | "h2" | "h3";
  className?: string;
};

export function Text({
  children,
  as = "p",
  className = "",
}: TextProps) {
  const Component = as;

  const baseStyles = {
    h1: "text-5xl md:text-6xl font-serif leading-tight",
    h2: "text-3xl md:text-4xl font-serif leading-snug",
    h3: "text-xl font-serif",
    p: "text-base leading-relaxed",
  };

  return (
    <Component className={`${baseStyles[as]} ${className}`}>
      {children}
    </Component>
  );
}
