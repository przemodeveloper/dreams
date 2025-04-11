import { dreamOptions, orientationOptions, genderOptions} from "./form";

export const imageRefIds = [
  "profile_image_1",
  "profile_image_2",
  "profile_image_3",
];

export const LOADING_STATE = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
} as const;

export type LoadingState = typeof LOADING_STATE[keyof typeof LOADING_STATE];

export const OPTIONS = {
  gender: genderOptions.filter((option) => Boolean(option.value)),
  orientation: orientationOptions.filter((option) => Boolean(option.value)),
  dream: dreamOptions.filter((option) => Boolean(option.value)),
};

export const generateAiPrompt = (username?: string, dream?: string, interests?: string) => {
  return `Generate a dating profile bio for me that is 100 words long and is about me. My name is ${username}, my dream/long term goal is ${dream}, my interests are ${interests}.`;
};

export const initialValues = {
  username: {
    value: "",
  },
  bio: {
    value: "",
  },
  dream: {
    value: "",
    label: "",
  },
  age: {
    value: "",
  },
  gender: {
    value: "",
    label: "",
  },
  orientation: {
    value: "",
    label: "",
  },
}


