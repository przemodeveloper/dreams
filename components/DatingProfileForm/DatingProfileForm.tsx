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
        profileCreated: new Date().toISOString(),
      });
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="w-full px-3 mb-4">
        <label
          className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="font-secondary appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          name="username"
          required
          id="username"
        />
      </div>

      <div className="w-full px-3 mb-4">
        <label
          htmlFor="bio"
          className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Bio
        </label>
        <textarea
          id="bio"
          rows={4}
          className="font-secondary appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        />
      </div>

      <div className="w-full px-3 mb-4">
        <label
          className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="dream"
        >
          Dream
        </label>
        <div>
          <select
            className="font-secondary appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            name="dream"
            id="dream"
            required
          >
            <option value="">Select your dream</option>
            <option value="abroad">Live abroad</option>
            <option value="travel">Travel</option>
            <option value="family">Start a family</option>
          </select>
        </div>
      </div>

      <div className="w-full px-3 mb-4">
        <label
          className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="age"
        >
          Age
        </label>
        <input
          className="font-secondary appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="number"
          min={18}
          required
          name="age"
          id="age"
        />
      </div>

      <div className="w-full px-3 mb-4">
        <label
          className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="gender"
        >
          Gender
        </label>
        <div>
          <select
            className="font-secondary appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            name="gender"
            id="gender"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="w-full text-right px-3 mb-4">
        <button
          type="submit"
          className="border-2 bg-black hover:bg-white hover:border-2 hover:border-black hover:text-black text-white font-bold py-2 px-4 rounded"
        >
          Start your dream
        </button>
      </div>
    </form>
  );
}
