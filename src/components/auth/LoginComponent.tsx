"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "@/components/auth/FormContainer";
import FormInput from "@/components/auth/FormInput";
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/toast-provider";
import { FcGoogle } from "react-icons/fc";

const LoginComponent = () => {
  const t = useTranslations("Auth.Login");
  const { toast } = useToast();
  const router = useRouter();

  // Create schema with translated error messages
  const schema = z.object({
    email: z.string().email(t("errors.invalidEmail")),
    password: z.string().min(1, t("errors.passwordRequired")),
  });

  type FormData = z.infer<typeof schema>;

  const [loading, setLoading] = useState(false);
  const [isGoogleSign, setIsGoogleSign] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      toast({
        message: t("signingIn"),
        type: "loading",
      });

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error && response.error !== "undefined") {
        throw new Error(response.error);
      }

      if (response?.ok) {
        toast({
          message: t("loginSuccess"),
          type: "success",
        });

        // Fetch updated session after login
        const updatedSession = await getSession();
        const role = updatedSession?.user?.role;

        if (role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (role === "AGENCY") {
          router.push("/agency/dashboard");
        } else {
          router.push("/citizen/dashboard");
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message !== "undefined") {
        toast({
          message: error.message,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsGoogleSign(true);
    try {
      toast({
        message: t("continueWithGoogle"),
        type: "loading",
      });

      let callbackUrl = "/login";
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "ADMIN") {
        callbackUrl = "/admin/dashboard";
      } else if (role === "AGENCY") {
        callbackUrl = "/agency/dashboard";
      } else {
        callbackUrl = "/citizen/dashboard";
      }

      const result = await signIn("google", {
        callbackUrl: callbackUrl,
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
    <div className="mt-24">
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

          <FormInput
            label={t("passwordLabel")}
            type="password"
            placeholder={t("passwordPlaceholder")}
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                {t("rememberMe")}
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                {t("forgotPassword")}
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full shadow-amber-600 shadow px-6"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("signingIn")}
              </>
            ) : (
              t("signIn")
            )}
          </Button>

          <div className="space-y-3">
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full"
              disabled={isGoogleSign}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              {isGoogleSign && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("continueWithGoogle")}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            {t("noAccount")}{" "}
            <Link href="/register" className="text-purple-600 hover:underline">
              {t("signUp")}
            </Link>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default LoginComponent;
