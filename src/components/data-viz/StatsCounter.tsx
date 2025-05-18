"use client";

import { useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Motion } from "../animations/MotionWrapper";

export default function StatsCounter({
  endValue,
  title,
  icon,
  color,
}: {
  endValue: number;
  title: string;
  icon: string;
  color?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, endValue, { duration: 2 });
      return animation.stop;
    }
  }, [endValue, isInView, count]);

  return (
    <Motion.div
      className={`p-4 rounded-lg ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
    >
      <div className="flex items-center justify-between">
        <div>
          <Motion.p className="text-3xl font-bold">{rounded}</Motion.p>
          <p className="text-sm">{title}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </Motion.div>
  );
}
