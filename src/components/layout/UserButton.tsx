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
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function UserButton() {
  const t = useTranslations();

  const { data: session, status } = useSession();

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
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <User className="h-[1.2rem] w-[1.2rem] shadow shadow-yellow-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white shadow shadow-black"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-green-500 text-sm font-medium leading-none">
                  {session?.user?.name}
                </p>
                <p className="text-blue-500 text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/api/auth/signout"> {t("Header.Sign out")}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
