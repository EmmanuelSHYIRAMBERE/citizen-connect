"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { Motion } from "../animations/MotionWrapper";

const ProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
});

type FormData = z.infer<typeof ProfileSchema>;

const CitizenProfileComponent = () => {
  const t = useTranslations("Citizen.Profile");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        toast.success(t("updateSuccess"));
      } else {
        toast.error(t("updateError"));
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(t("updateError"));
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <Link href="/citizen/dashboard">
            <Button variant="outline">{t("backToDashboard")}</Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
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
                disabled
              />
              <p className="mt-1 text-sm text-gray-500">
                {t("form.emailNote")}
              </p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                {t("form.phone")}
              </label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                {t("form.address")}
              </label>
              <Input
                id="address"
                {...register("address")}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !isDirty}>
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </Button>
            </div>
          </form>
        </div>
      </Motion.div>
    </div>
  );
};

export default CitizenProfileComponent;
