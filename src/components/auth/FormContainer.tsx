import { ReactNode } from "react";
import { Motion } from "../animations/MotionWrapper";

interface FormContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function FormContainer({
  children,
  title,
  subtitle,
}: FormContainerProps) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </Motion.div>
  );
}
