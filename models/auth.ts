import type { User } from "firebase/auth";

export interface UserProfile extends User {
  username?: string;
  bio?: string;
  dream?: string;
  age?: number;
  gender?: string;
  orientation?: string;
  profileCreated?: string;
}
