import { ImageObject } from "@/hooks/useManageUser";
import {
  DREAM_OPTIONS,
  GENDER_OPTIONS,
  ORIENTATION_OPTIONS,
} from "@/constants/form";

export interface Profile {
  id: string;
  username: string;
  image: ImageObject;
  age: number;
  bio?: string;
  dream: keyof typeof DREAM_OPTIONS;
  orientation: keyof typeof ORIENTATION_OPTIONS;
  interests: string;
  gender: keyof typeof GENDER_OPTIONS;
  location?: {
    address: string;
    coords: {
      latitude: number;
      longitude: number;
    };
  };
}
