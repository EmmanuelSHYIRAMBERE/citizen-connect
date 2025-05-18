import { franc } from "franc-min";

const SUPPORTED_LANGUAGES = ["eng", "fra", "kin"];
const LANGUAGE_MAP: Record<string, string> = {
  eng: "en-US",
  fra: "fr",
  kin: "rw",
};

export async function detectLanguage(text: string): Promise<string> {
  const langCode = franc(text);

  if (SUPPORTED_LANGUAGES.includes(langCode)) {
    return LANGUAGE_MAP[langCode];
  }

  return "en-US"; // Default to English
}

export async function translateText(
  text: string,
  fromLang: string,
  toLang: string
): Promise<string> {
  // TODO: call a translation API here
  // For now, we'll just return the same text

  console.log("Translating text from", fromLang, "to", toLang);

  return text;
}
