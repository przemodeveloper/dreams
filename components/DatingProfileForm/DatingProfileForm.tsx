"use client";

import useUserData from "@/hooks/useAuthUser";
import FormField from "../FormField/FormField";
import Select from "../Select/Select";
import { handleSetProfile } from "@/lib/actions";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useActionState } from "react";
import type { InitialErrorState } from "@/models/form";
import { joinErrorMessages } from "@/utils/joinErrorMessages";

export const initialErrorState = {
  age: [""],
  username: [""],
  dream: [""],
  gender: [""],
};

export default function DatingProfileForm() {
  const { user } = useUserData();

  const [state, formAction] = useActionState(
    (prevState: InitialErrorState, formData: FormData) =>
      handleSetProfile(prevState, formData, user?.uid),
    initialErrorState
  );

  return (
    <form className="w-full max-w-lg" action={formAction}>
      <div className="w-full px-3 mb-4">
        <FormField
          name="username"
          id="username"
          type="text"
          label="Username"
          Component="input"
          error={joinErrorMessages(state.username)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="bio"
          id="bio"
          type="textarea"
          label="Bio"
          Component="textarea"
          rows={4}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          name="dream"
          id="dream"
          label="Dream"
          options={[
            { label: "Select your dream", value: "" },
            { label: "Live abroad", value: "abroad" },
            { label: "Travel", value: "travel" },
            { label: "Start a family", value: "family" },
          ]}
          error={joinErrorMessages(state.dream)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="age"
          id="age"
          type="number"
          min={18}
          label="Age"
          Component="input"
          error={joinErrorMessages(state.age)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          name="gender"
          id="gender"
          label="Gender"
          options={[
            { label: "Select gender", value: "" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          error={joinErrorMessages(state.gender)}
        />
      </div>

      <div className="w-full text-right px-3 mb-4">
        <SubmitButton />
      </div>
    </form>
  );
}
