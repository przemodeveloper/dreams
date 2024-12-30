"use client";

import { db } from "@/firebase";
import useUserData from "@/hooks/useAuthUser";
import { addDoc, collection } from "firebase/firestore";

export default function DatingProfileForm() {
  const { user } = useUserData();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const bio = formData.get("bio");
    const age = formData.get("age");
    const gender = formData.get("gender");

    if (user?.uid) {
      addDoc(collection(db, "profiles", user.uid, "userProfile"), {
        username,
        bio,
        age,
        gender,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio" />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}
