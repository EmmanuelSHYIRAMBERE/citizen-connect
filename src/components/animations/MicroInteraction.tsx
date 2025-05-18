"use client";

import { ReactNode } from "react";
import { Motion } from "./MotionWrapper";

export default function MicroInteraction({
  children,
  scale = 1.05,
  className = "",
}: {
  children: ReactNode;
  scale?: number;
  className?: string;
}) {
  return (
    <Motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}
