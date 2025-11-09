export const DREAM_OPTIONS = {
  abroad: "Live abroad",
  travel: "Travel",
  family: "Start a family",
} as const;

export const GENDER_OPTIONS = {
  male: "Male",
  female: "Female",
} as const;

export const ORIENTATION_OPTIONS = {
  straight: "Straight",
  gay: "Gay",
  lesbian: "Lesbian",
  bisexual: "Bisexual",
} as const;

export const genderOptions = [
  { label: "Select gender", value: "" },
  ...Object.entries(GENDER_OPTIONS).map(([value, label]) => ({ label, value })),
];

export const orientationOptions = [
  { label: "Select sexual orientation", value: "" },
  ...Object.entries(ORIENTATION_OPTIONS).map(([value, label]) => ({
    label,
    value,
  })),
];

export const dreamOptions = [
  { label: "Select your dream", value: "" },
  ...Object.entries(DREAM_OPTIONS).map(([value, label]) => ({ label, value })),
];

export const initialRegisterFormState = {
  success: false,
  formValues: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  formErrors: {
    email: [""],
    password: [""],
    confirmPassword: [""],
  },
};

export const initialLoginFormState = {
  success: false,
  authToken: null,
  userId: null,
  emailVerified: null,
  formValues: {
    email: "",
    password: "",
  },
  formErrors: {
    email: [""],
    password: [""],
  },
};

export const initialSetupProfileFormState = {
  success: false,
  formValues: {
    age: "",
    username: "",
    gender: "",
    dream: "",
    interests: "",
    location: {
      address: "",
      coords: {
        lat: null,
        lng: null,
      },
    },
    bio: "",
    orientation: "",
  },
  formErrors: {
    age: [""],
    username: [""],
    dream: [""],
    gender: [""],
    orientation: [""],
    interests: [""],
    location: [""],
  },
};
