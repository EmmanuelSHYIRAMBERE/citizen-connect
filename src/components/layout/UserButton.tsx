"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const getInitials = (userType?: string) => {
  switch (userType) {
    case "ADMIN":
      return "AD";
    case "AGENCY":
      return "AC";
    default:
      return "CI";
  }
};

export function UserButton() {
  const t = useTranslations();

  const { data: session, status } = useSession();

  let callbackUrl = "/login";
  const role = session?.user?.role;

  if (role === "ADMIN") {
    callbackUrl = "/admin/dashboard";
  } else if (role === "AGENCY") {
    callbackUrl = "/agency/dashboard";
  } else {
    callbackUrl = "/citizen/dashboard";
  }

  return (
    <>
      {status !== "loading" && status === "unauthenticated" ? (
        <Link
          href="/login"
          className="shadow hover:bg-blue-500 bg-green-500 rounded-full p-1.5"
        >
          {t("Auth.Register.header")}
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="shadow hover:bg-blue-500 bg-green-500 rounded-full"
          >
            <Button variant="ghost" size="icon" aria-label="User profile">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>{getInitials(role)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white shadow shadow-black p-4"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="User profile"
                  className="rounded-full shadow shadow-black"
                >
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{getInitials(role)}</AvatarFallback>
                  </Avatar>
                </Button>

                <div className="flex flex-col space-y-1">
                  <p className="text-green-500 text-sm font-medium leading-none">
                    {session?.user?.name}
                  </p>
                  <p className="text-blue-500 text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-yellow-500 text-white rounded-lg hover:bg-gray-100 hover:text-black shadow shadow-black">
              <Link href={callbackUrl} className="p-2 font-semibold">
                {" "}
                {t("Header.Your account")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-green-500 text-white rounded-lg hover:bg-gray-100 hover:text-black shadow shadow-black">
              <Link href="/api/auth/signout" className="p-2 font-semibold">
                {" "}
                {t("Header.Sign out")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
