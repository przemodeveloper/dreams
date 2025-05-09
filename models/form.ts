export interface InitialRegisterFormState {
  success?: boolean;
  formValues: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  formErrors: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}

export interface InitialLoginFormState {
  success?: boolean;
  formValues: {
    email: string;
    password: string;
  };
  authToken: string | null;
  emailVerified: boolean | null;
  userId: string | null;
  formErrors: {
    email?: string[];
    password?: string[];
  };
}

export interface InitialSetupProfileFormState {
  success?: boolean;
  formValues: {
    age?: number | string | undefined;
    username?: string | undefined;
    dream?: string | undefined;
    gender?: string | undefined;
    orientation?: string | undefined;
    bio?: string | undefined;
    interests?: string | undefined;
  };
  formErrors: {
    age?: string[];
    username?: string[];
    dream?: string[];
    gender?: string[];
    orientation?: string[];
    interests?: string[];
  };
}

export interface Option {
  value: string;
  label: string;
}

export type Field = "username" | "bio" | "dream" | "gender" | "orientation" | "age" | "interests" | "location";
