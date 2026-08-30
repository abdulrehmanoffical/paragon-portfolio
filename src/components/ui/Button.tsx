import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles =
    "px-6 py-3 font-sans text-sm tracking-wide transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strong/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variants = {
    primary: "bg-strong text-background hover:bg-text",
    secondary: "bg-secondary text-background hover:opacity-90",
    outline: "border border-border text-strong hover:bg-strong hover:text-background hover:border-strong",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
