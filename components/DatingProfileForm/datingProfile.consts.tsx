export const genderOptions = [
  { label: "Select gender", value: "" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const dreamOptions = [
  { label: "Select your dream", value: "" },
  { label: "Live abroad", value: "abroad" },
  { label: "Travel", value: "travel" },
  { label: "Start a family", value: "family" },
];

export const initialFormState = {
  formValues: {
    age: "",
    username: "",
    gender: "",
    dream: "",
    bio: "",
  },
  formErrors: {
    age: [""],
    username: [""],
    dream: [""],
    gender: [""],
  },
};
