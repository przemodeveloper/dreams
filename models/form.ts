export interface InitialFormState {
  formValues: {
    age?: number | string | undefined;
    username?: string | undefined;
    dream?: string | undefined;
    gender?: string | undefined;
  };
  formErrors: {
    age?: string[];
    username?: string[];
    dream?: string[];
    gender?: string[];
  };
}
