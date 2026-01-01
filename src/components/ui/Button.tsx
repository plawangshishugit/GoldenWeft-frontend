type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-soft transition-all duration-300 ease-silk text-sm";

  const styles = {
    primary:
      "bg-charcoal text-ivory hover:bg-charcoal/90",
    secondary:
      "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
