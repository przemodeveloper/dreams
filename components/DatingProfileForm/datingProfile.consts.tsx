export const genderOptions = [
  { label: "Select gender", value: "" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const orientationOptions = [
  { label: "Select sexual orientation", value: "" },
  { label: "Straight", value: "straight" },
  { label: "Gay", value: "gay" },
  { label: "Lesbian", value: "lesbian" },
  { label: "Bisexual", value: "bisexual" },
];

export const dreamOptions = [
  { label: "Select your dream", value: "" },
  { label: "Live abroad", value: "abroad" },
  { label: "Travel", value: "travel" },
  { label: "Start a family", value: "family" },
];

export const initialFormState = {
  success: false,
  formValues: {
    age: "",
    username: "",
    gender: "",
    dream: "",
    bio: "",
    orientation: "",
  },
  formErrors: {
    age: [""],
    username: [""],
    dream: [""],
    gender: [""],
    orientation: [""],
  },
};
