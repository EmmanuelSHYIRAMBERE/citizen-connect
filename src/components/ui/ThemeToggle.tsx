"use client";

import { ChevronDownIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { useTranslations } from "next-intl";
import useColorStore from "@/hooks/use-color-store";
import useIsMounted from "@/hooks/use-is-mounted";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { availableColors, color, setColor } = useColorStore(theme);
  const t = useTranslations("Header");
  const changeTheme = (value: string) => {
    setTheme(value);
  };
  const isMounted = useIsMounted();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer p-1 border border-transparent hover:border-white rounded-[2px] h-[41px] shadow shadow-white">
        {theme === "dark" && isMounted ? (
          <div className="flex items-center gap-1">
            <Moon className="h-4 w-4" /> {t("Dark")} <ChevronDownIcon />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Sun className="h-4 w-4 text-yellow-500" /> {t("Light")}{" "}
            <ChevronDownIcon />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white shadow shadow-black">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value="dark">
            <Moon className="h-4 w-4 mr-1" /> {t("Dark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            <Sun className="h-4 w-4 mr-1" /> {t("Light")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t("Color")}</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
        >
          {availableColors.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.name}>
              <div
                style={{ backgroundColor: c.name }}
                className="h-4 w-4 mr-1 rounded-full"
              ></div>

              {t(c.name)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
