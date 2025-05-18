export interface RegistrationFormValues {
  email: string;
  name: string;
  nationalId: string;
  password: string;
  confirmPassword: string;
  interests: string[];
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ResetPasswordFormValues {
  email: string;
}

export interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeEmailFormValues {
  email: string;
  password: string;
}

export interface ChangeNameFormValues {
  name: string;
  password: string;
}

export interface ChangeNationalIdFormValues {
  nationalId: string;
  password: string;
}

export interface ChangeInterestsFormValues {
  interests: string[];
  password: string;
}
