"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "@/components/auth/FormContainer";
import FormInput from "@/components/auth/FormInput";
import { Button } from "../ui/button";
import { Lock } from "lucide-react";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { useSearchParams } from "next/navigation";
import { useToast } from "../toast-provider";

const ResetPasswordComponent = () => {
  const t = useTranslations("Auth.ResetPassword");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToast();

  const schema = z
    .object({
      password: z
        .string()
        .min(8, t("errors.passwordLength"))
        .regex(/[A-Z]/, t("errors.passwordUppercase"))
        .regex(/[a-z]/, t("errors.passwordLowercase"))
        .regex(/[0-9]/, t("errors.passwordNumber")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.passwordMatch"),
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
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
    <FormContainer title={t("title")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label={t("newPasswordLabel")}
          type="password"
          placeholder={t("newPasswordPlaceholder")}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          error={errors.password?.message}
          {...register("password")}
        />
        {password && <PasswordStrength password={password} />}

        <FormInput
          label={t("confirmPasswordLabel")}
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          variant="secondary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("updating") : t("submit")}
        </Button>
      </form>
    </FormContainer>
  );
};
export default ResetPasswordComponent;
