"use client";

import { Motion } from "./MotionWrapper";

export function TypingIndicator() {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <Motion.div
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{
            y: [0, -5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
