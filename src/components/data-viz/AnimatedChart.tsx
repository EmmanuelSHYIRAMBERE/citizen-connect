"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Motion } from "../animations/MotionWrapper";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 27 },
  { name: "May", value: 18 },
  { name: "Jun", value: 23 },
  { name: "Jul", value: 34 },
];

export default function AnimatedChart() {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-64 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#8884d8"
            animationBegin={100}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </Motion.div>
  );
}

export function AnimatedChartSkeleton() {
  return <Skeleton className="h-64 w-full" />;
}
