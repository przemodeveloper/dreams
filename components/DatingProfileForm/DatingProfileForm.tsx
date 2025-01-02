"use client";

import useUserData from "@/hooks/useAuthUser";
import FormField from "../FormField/FormField";
import Select from "../Select/Select";
import { handleSetProfile } from "@/lib/actions";
import { useActionState } from "react";

export default function DatingProfileForm() {
  const { user } = useUserData();

  const [state, formAction] = useActionState(
    (prevState: void | null, formData: FormData) =>
      handleSetProfile(prevState, formData, user?.uid),
    null
  );

  return (
    <form className="w-full max-w-lg" action={formAction}>
      <div className="w-full px-3 mb-4">
        <FormField
          name="username"
          id="username"
          type="text"
          required
          label="Username"
          Component="input"
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="bio"
          id="bio"
          type="textarea"
          required
          label="Bio"
          Component="textarea"
          rows={4}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          name="dream"
          id="dream"
          required
          label="Dream"
          options={[
            { label: "Select your dream", value: "" },
            { label: "Live abroad", value: "abroad" },
            { label: "Travel", value: "travel" },
            { label: "Start a family", value: "family" },
          ]}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="age"
          id="age"
          type="number"
          required
          label="Age"
          Component="input"
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          name="gender"
          id="gender"
          required
          label="Gender"
          options={[
            { label: "Select gender", value: "" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
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
