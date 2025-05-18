"use client";

import { ReactNode } from "react";
import { Motion } from "./MotionWrapper";

export default function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-xl p-4 shadow-sm border ${className}`}
    >
      {children}
    </Motion.div>
  );
}
