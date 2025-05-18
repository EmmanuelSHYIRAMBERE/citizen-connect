"use client";

import AppInitializer from "./app-initializer";
import { ClientSetting } from "@/types";
import { ThemeProvider } from "./theme-provider";

export default function ClientProviders({
  setting,
  children,
}: {
  setting: ClientSetting;
  children: React.ReactNode;
}) {
  return (
    <AppInitializer setting={setting}>
      <ThemeProvider
        attribute="class"
        defaultTheme={setting.common.defaultTheme.toLocaleLowerCase()}
      >
        <div>{children}</div>
      </ThemeProvider>
    </AppInitializer>
  );
}
