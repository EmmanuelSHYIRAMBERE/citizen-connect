import { z } from "zod";
import {
  SiteLanguageSchema,
  SettingInputSchema,
  UserInputSchema,
  UserNameSchema,
  UserSignInSchema,
  UserSignUpSchema,
} from "@/lib/validator";

export type Data = {
  settings: ISettingInput[];
  users: IUserInput[];
  headerMenus: {
    name: string;
    href: string;
  }[];
};
// user
export type IUserInput = z.infer<typeof UserInputSchema>;
export type IUserSignIn = z.infer<typeof UserSignInSchema>;
export type IUserSignUp = z.infer<typeof UserSignUpSchema>;
export type IUserName = z.infer<typeof UserNameSchema>;

export type ISettingInput = z.infer<typeof SettingInputSchema>;
export type ClientSetting = ISettingInput;
export type SiteLanguage = z.infer<typeof SiteLanguageSchema>;
