"use client";

import { useTranslations } from "next-intl";
import { Lock, User, Loader, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/auth/FormInput";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface Step4FormValues {
  name: string;
  nationalId: string;
  password: string;
  confirmPassword: string;
}

interface Step4Props {
  setStep: (step: number) => void;
  handlePasswordSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  registerPassword: UseFormRegister<Step4FormValues>;
  passwordErrors: FieldErrors<Step4FormValues>;
  password: string;
  isRegisteringUser: boolean;
}

export const Step4PasswordSetup = ({
  setStep,
  handlePasswordSubmit,
  registerPassword,
  passwordErrors,
  password,
  isRegisteringUser,
}: Step4Props) => {
  const t = useTranslations("Auth.Register");

  const validateNationalId = (value: string) => value.length === 16;

  return (
    <>
      <button
        onClick={() => setStep(3)}
        className="flex items-center text-sm text-gray-600 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {t("back")}
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t("steps.password")}
      </h2>
      <p className="text-gray-600 mb-6">{t("passwordSetupDescription")}</p>

      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <FormInput
          label={t("nameLabel")}
          type="text"
          placeholder={t("namePlaceholder")}
          icon={<User className="h-5 w-5 text-gray-400" />}
          error={passwordErrors.name?.message}
          {...registerPassword("name")}
        />

        <FormInput
          label={t("nationalIdLabel")}
          type="text"
          placeholder={t("nationalIdPlaceholder")}
          icon={<User className="h-5 w-5 text-gray-400" />}
          error={passwordErrors.nationalId?.message}
          {...registerPassword("nationalId", { validate: validateNationalId })}
        />

        <FormInput
          label={t("passwordLabel")}
          type="password"
          placeholder={t("passwordPlaceholder")}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          error={passwordErrors.password?.message}
          {...registerPassword("password")}
        />
        {password && <PasswordStrength password={password} />}

        <FormInput
          label={t("confirmPasswordLabel")}
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          error={passwordErrors.confirmPassword?.message}
          {...registerPassword("confirmPassword")}
        />

        <Button
          type="submit"
          className="w-full shadow shadow-amber-900 px-6"
          variant="secondary"
          disabled={isRegisteringUser}
        >
          {isRegisteringUser && (
            <Loader className="mr-2 h-5 w-5 animate-spin" />
          )}
          {t("completeRegistration")}
        </Button>
      </form>
    </>
  );
};
