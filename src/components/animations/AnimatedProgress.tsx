"use client";

import { useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Motion } from "./MotionWrapper";

export default function AnimatedProgress({
  value,
  max = 100,
  color = "bg-primary",
  className = "",
}: {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}) {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, max], ["0%", "100%"]);

  useEffect(() => {
    progress.set(value);
  }, [value, progress]);

  return (
    <div
      className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <Motion.div
        className={`h-full ${color}`}
        style={{ width }}
        initial={{ width: "0%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
}
