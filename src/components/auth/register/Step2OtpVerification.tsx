"use client";

import { ChevronLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface Step2Props {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  verifyOtp: () => void;
  isOTPVerifying: boolean;
  setStep: (step: number) => void;
  handleEmailSubmit: () => Promise<void>;
  isResending: boolean;
  setIsResending: (isResending: boolean) => void;
}

export const Step2OtpVerification = ({
  email,
  otp,
  setOtp,
  verifyOtp,
  isOTPVerifying,
  setStep,
  handleEmailSubmit,
  isResending,
  setIsResending,
}: Step2Props) => {
  const t = useTranslations("Auth.Register");

  return (
    <>
      <button
        onClick={() => setStep(1)}
        className="flex items-center text-sm text-gray-600 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {t("back")}
      </button>

      <p className="text-blue-500 mb-6">
        {t("codeHasSent")}{" "}
        <span className="font-medium text-yellow-500">{email}</span>
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-green-500 mb-2">
            {t("verificationCodeSent")}{" "}
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition text-center text-xl tracking-widest"
            placeholder="------"
          />
        </div>

        <Button
          onClick={verifyOtp}
          className="w-full shadow shadow-amber-900 px-6"
          disabled={otp.length !== 6 || isOTPVerifying}
        >
          {isOTPVerifying && <Loader className="mr-2 h-5 w-5 animate-spin " />}{" "}
          {t("VerifyCode")}{" "}
        </Button>

        <p className="text-center text-sm text-gray-500">
          {t("VerifyCodeNotReceived")}{" "}
          <button
            type="button"
            onClick={async () => {
              setIsResending(true);
              await handleEmailSubmit();
            }}
          >
            {isResending && <Loader className="mr-2 h-5 w-5 animate-spin " />}{" "}
            {t("resend")}
          </button>
        </p>
      </div>
    </>
  );
};
