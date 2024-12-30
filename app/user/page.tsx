"use client";

import useUserData from "@/hooks/useUserData";

export default function UserProfilePage() {
  const user = useUserData();

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="font-primary mb-2 text-center">
        Set up your dating profile!
      </h1>
      <form>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
        </fieldset>
        <fieldset>
          <label htmlFor="bio">Bio</label>
          <textarea name="bio" />
        </fieldset>
        <fieldset>
          <label htmlFor="age">Age</label>
          <input type="number" name="age" />
        </fieldset>
        <fieldset>
          <label htmlFor="gender">Gender</label>
          <select name="gender">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </fieldset>
      </form>
    </div>
  );
}
