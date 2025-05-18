"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import StatsCard from "./StatsCard";
import { Motion } from "../animations/MotionWrapper";

interface StatItem {
  value: number;
  label: string;
}

const AnimatedStats = ({ stats }: { stats: StatItem[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <StatsCard
            value={stat.value.toLocaleString()}
            title={stat.label}
            icon={
              <span className="text-2xl">
                {index === 0 ? "📝" : index === 1 ? "✅" : "🏛️"}
              </span>
            }
            className="bg-white dark:bg-gray-800"
          />
        </Motion.div>
      ))}
    </div>
  );
};

export default AnimatedStats;
