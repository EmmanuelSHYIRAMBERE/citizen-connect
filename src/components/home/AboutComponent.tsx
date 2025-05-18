"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Motion } from "../animations/MotionWrapper";

const AboutComponent = () => {
  const t = useTranslations("About");

  const features = [
    {
      title: t("features.transparency.title"),
      description: t("features.transparency.description"),
    },
    {
      title: t("features.efficiency.title"),
      description: t("features.efficiency.description"),
    },
    {
      title: t("features.accountability.title"),
      description: t("features.accountability.description"),
    },
    {
      title: t("features.engagement.title"),
      description: t("features.engagement.description"),
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t("description")}
        </p>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {features.map((feature, index) => (
          <Motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="h-full p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          </Motion.div>
        ))}
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-50 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">{t("howItWorks.title")}</h2>

        <div className="space-y-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {step}
                </div>
                {step < 4 && <div className="w-0.5 h-full bg-gray-200"></div>}
              </div>

              <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2">
                  {t(`howItWorks.step${step}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`howItWorks.step${step}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Motion.div>
    </div>
  );
};

export default AboutComponent;
