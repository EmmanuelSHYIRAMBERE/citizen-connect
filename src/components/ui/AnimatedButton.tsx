"use client";

import { ReactNode } from "react";
import { Motion } from "../animations/MotionWrapper";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export function AnimatedButton({
  children,
  onClick,
  disabled = false,
  className = "",
  href,
  type = "button",
  ...props
}: AnimatedButtonProps) {
  const Component = href ? "a" : "button";

  return (
    <Motion.div
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Component
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
        href={href}
        type={type}
        {...props}
      >
        {children}
      </Component>
    </Motion.div>
  );
}
