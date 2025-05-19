"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Motion } from "../animations/MotionWrapper";

const ContactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  department: z.string(),
  message: z.string(),
});

type FormData = z.infer<typeof ContactFormSchema>;

const ContactComponent = () => {
  const t = useTranslations("Contact");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(t("successMessage"));
        reset();
      } else {
        toast.error(t("errorMessage"));
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(t("errorMessage"));
    }
  };

  const departments = [
    { id: "general", name: t("departments.general") },
    { id: "technical", name: t("departments.technical") },
    { id: "complaints", name: t("departments.complaints") },
    { id: "feedback", name: t("departments.feedback") },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <div>
          <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
          <p className="text-gray-600 mb-8">{t("description")}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t("form.name")}
              </label>
              <Input
                id="name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t("form.email")}
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium mb-1"
              >
                {t("form.department")}
              </label>
              <select
                id="department"
                {...register("department")}
                className={`w-full p-2 border rounded-md ${
                  errors.department ? "border-red-500" : "border-gray-300"
                }`}
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                {t("form.message")}
              </label>
              <Textarea
                id="message"
                rows={5}
                {...register("message")}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("form.submitting") : t("form.submit")}
            </Button>
          </form>
        </div>

        <Motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-xl p-8 h-fit"
        >
          <h2 className="text-2xl font-bold mb-6">{t("contactInfo.title")}</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">
                {t("contactInfo.address.title")}
              </h3>
              <p className="text-gray-600">{t("contactInfo.address.line1")}</p>
              <p className="text-gray-600">{t("contactInfo.address.line2")}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t("contactInfo.phone")}</h3>
              <p className="text-gray-600">+(250) 123 456 789</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t("contactInfo.email")}</h3>
              <p className="text-gray-600">info@citizenportal.gov.rw</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                {t("contactInfo.hours.title")}
              </h3>
              <p className="text-gray-600">{t("contactInfo.hours.weekdays")}</p>
              <p className="text-gray-600">{t("contactInfo.hours.weekends")}</p>
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default ContactComponent;
