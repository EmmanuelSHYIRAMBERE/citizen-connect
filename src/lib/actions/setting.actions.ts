import { ISettingInput } from "@/types";

export const getSetting = async (): Promise<ISettingInput> => {
  const setting = {
    common: {
      defaultTheme: "light",
      defaultColor: "gold",
    },
    site: {
      name: "Citizen Engagement Portal",
      logo: "/logo.png",
      slogan: "Government-citizen communication platform",
      description: "Citizen Engagement Portal",
      keywords: "Government, Citizen, Communication, Platform",
      url: "",
      email: "",
      phone: "(123) 456-7890",
      author: "Emmanuel SHYIRAMBERE",
      copyright: "© 2025 Citizen Connect. All rights reserved.",
      address: "Kigali, Rwanda",
    },
    availableLanguages: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "rw",
        name: "Kinyarwanda",
      },
      {
        code: "fr",
        name: "French",
      },
    ],
  };
  return setting;
};
