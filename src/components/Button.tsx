import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-50 disabled:pointer-events-none";
  const styles = {
    primary: "bg-[var(--accent)] text-white hover:brightness-110 px-4 py-2.5",
    secondary: "border border-white/15 text-white hover:bg-white/10 px-4 py-2.5",
    ghost: "hover:bg-white/10 px-3 py-2",
  } as const;
  return <button className={`${base} ${styles[variant]} ${className ?? ""}`} {...props} />;
}


