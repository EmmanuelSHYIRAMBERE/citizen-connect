"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormContainer from "@/components/auth/FormContainer";
import FormInput from "@/components/auth/FormInput";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useToast } from "../toast-provider";

const ForgotPasswordComponent = () => {
  const t = useTranslations("Auth.ForgotPassword");

  const toast = useToast();
  const schema = z.object({
    email: z.string().email(t("errors.invalidEmail")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t("errors.submissionFailed"));
      }

      toast.toast({
        message: t("success"),
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.toast({
          message: error.message,
          type: "error",
        });
      }
    }
  };

  return (
    <FormContainer title={t("title")} subtitle={t("description")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label={t("emailLabel")}
          type="email"
          placeholder={t("emailPlaceholder")}
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("sending") : t("submit")}
        </Button>

        <div className="text-center text-sm text-gray-600 mt-4">
          {t("rememberPassword")}{" "}
          <Link href="/login" className="text-purple-600 hover:underline">
            {t("signIn")}
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};
export default ForgotPasswordComponent;
