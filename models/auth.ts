import type { ImageObject } from "@/hooks/useManageUser";
import type { User } from "firebase/auth";

export interface UserProfile extends User {
  username?: string;
  bio?: string;
  dream?: string;
  images?: ImageObject[];
  age?: number;
  gender?: string;
  orientation?: string;
  profileCreated?: string;
  location?: string;
  userId?: string;
}
