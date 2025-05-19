"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/components/toast-provider";
import { Step1EmailEntry } from "@/components/auth/register/Step1EmailEntry";
import { Step2OtpVerification } from "@/components/auth/register/Step2OtpVerification";
import { Step3InterestSelection } from "@/components/auth/register/Step3InterestSelection";
import { Step4PasswordSetup } from "@/components/auth/register/Step4PasswordSetup";
import Link from "next/link";
import { Motion } from "../animations/MotionWrapper";

export default function RegisterComponent() {
  const t = useTranslations("Auth.Register");
  const router = useRouter();
  const { toast } = useToast();

  // Dynamic schema based on translations
  const emailSchema = z.object({
    email: z.string().email(t("errors.invalidEmail")),
  });

  const passwordSchema = z
    .object({
      password: z
        .string()
        .min(8, t("errors.passwordLength"))
        .regex(/[A-Z]/, t("errors.passwordUppercase"))
        .regex(/[a-z]/, t("errors.passwordLowercase"))
        .regex(/[0-9]/, t("errors.passwordNumber")),
      name: z.string().min(1, t("errors.nameRequired")),
      nationalId: z
        .string()
        .min(16, t("errors.nationalIdInvalid"))
        .max(16, t("errors.nationalIdInvalid")),

      confirmPassword: z.string().min(1, t("errors.passwordMatch")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.passwordMatch"),
      path: ["confirmPassword"],
    });

  type EmailFormData = z.infer<typeof emailSchema>;
  type PasswordFormData = z.infer<typeof passwordSchema>;

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isCredentialSignIn, setIsCredentialSignIn] = useState<boolean>(false);
  const [isGoogleSign, setIsGoogleSign] = useState(false);
  const [isOTPVerifying, setIsOTPVerifying] = useState(false);
  const [isSavingInterests, setIsSavingInterests] = useState(false);
  const [isRegisteringUser, setIsRegisteringUser] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Form for email step
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  // Form for password step
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const password = watch("password");

  // Handle email submission
  const onEmailSubmit = async (data: EmailFormData) => {
    setIsCredentialSignIn(true);
    try {
      toast({
        message: t("codeSent"),
        type: "loading",
      });

      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t("errors.invalidEmail"));
      }

      setEmail(data.email);
      setStep(2);
      toast({
        message: t("codeSent"),
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          type: "error",
        });
      }
    } finally {
      setIsCredentialSignIn(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    setIsOTPVerifying(true);
    try {
      toast({
        message: t("steps.verification"),
        type: "loading",
      });

      const response = await fetch("/api/email/otp-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t("errors.otpInvalid"));
      }

      setStep(3);
      toast({
        message: t("emailVerified"),
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          type: "error",
        });
      }
    } finally {
      setIsOTPVerifying(false);
    }
  };

  // Handle interest submission
  const handleInterestsSubmit = async () => {
    setIsSavingInterests(true);
    try {
      if (selectedInterests.length < 3) {
        throw new Error(t("errors.interestsRequired"));
      }

      toast({
        message: t("steps.interests"),
        type: "loading",
        duration: 2000,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStep(4);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          type: "error",
        });
      }
    } finally {
      setIsSavingInterests(false);
    }
  };

  // Handle interest selection
  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle password submission
  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsRegisteringUser(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: data.name,
          nationalId: data.nationalId,
          password: data.password,
          interests: selectedInterests,
        }),
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t("errors.registrationFailed"));
      }

      toast({
        message: t("registrationSuccess"),
        type: "success",
      });
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          type: "error",
        });
      }
    } finally {
      setIsRegisteringUser(false);
    }
  };

  // Social auth handlers
  const handleGoogleAuth = async () => {
    setIsGoogleSign(true);
    try {
      toast({
        message: t("continueWithGoogle"),
        type: "loading",
      });

      const result = await signIn("google", {
        callbackUrl: "/login",
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          type: "error",
        });
      }
    } finally {
      setIsGoogleSign(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-8 py-16 bg-white rounded-xl shadow-lg mt-2.5">
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center justify-center text-3xl font-bold text-yellow-500 w-full">
          CitizenConnect
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <Motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Step1EmailEntry
              handleEmailSubmit={handleEmailSubmit(onEmailSubmit)}
              registerEmail={registerEmail}
              emailErrors={emailErrors}
              isCredentialSignIn={isCredentialSignIn}
              handleGoogleAuth={handleGoogleAuth}
              isGoogleSign={isGoogleSign}
            />
          </Motion.div>
        )}

        {step === 2 && (
          <Motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Step2OtpVerification
              email={email}
              otp={otp}
              setOtp={setOtp}
              verifyOtp={verifyOtp}
              isOTPVerifying={isOTPVerifying}
              setStep={setStep}
              handleEmailSubmit={handleEmailSubmit(onEmailSubmit)}
              isResending={isResending}
              setIsResending={setIsResending}
            />
          </Motion.div>
        )}

        {step === 3 && (
          <Motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Step3InterestSelection
              setStep={setStep}
              selectedInterests={selectedInterests}
              toggleInterest={toggleInterest}
              handleInterestsSubmit={handleInterestsSubmit}
              isSavingInterests={isSavingInterests}
            />
          </Motion.div>
        )}

        {step === 4 && (
          <Motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Step4PasswordSetup
              setStep={setStep}
              handlePasswordSubmit={handlePasswordSubmit(onPasswordSubmit)}
              registerPassword={registerPassword}
              passwordErrors={passwordErrors}
              password={password}
              isRegisteringUser={isRegisteringUser}
            />
          </Motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-sm text-gray-500 mt-6">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="text-purple-600 hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
