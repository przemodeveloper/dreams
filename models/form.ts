export interface InitialFormState {
  success?: boolean;
  formValues: {
    age?: number | string | undefined;
    username?: string | undefined;
    dream?: string | undefined;
    gender?: string | undefined;
    bio?: string | undefined;
  };
  formErrors: {
    age?: string[];
    username?: string[];
    dream?: string[];
    gender?: string[];
  };
}

export interface Option {
  value: string;
  label: string;
}
