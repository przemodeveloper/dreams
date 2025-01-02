"use client";

import useUserData from "@/hooks/useAuthUser";
import FormField from "../FormField/FormField";
import Select from "../Select/Select";
import { handleSetProfile } from "@/lib/actions";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useActionState } from "react";
import type { InitialFormState } from "@/models/form";
import { joinErrorMessages } from "@/utils/joinErrorMessages";
import { dreamOptions, genderOptions } from "./datingProfile.consts";

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

export default function DatingProfileForm() {
  const { user } = useUserData();

  const [state, formAction] = useActionState(
    (prevState: InitialFormState, formData: FormData) =>
      handleSetProfile(prevState, formData, user?.uid),
    initialFormState
  );

  const { formErrors } = state || initialFormState.formErrors;
  const { formValues } = state || initialFormState.formValues;

  return (
    <form className="w-full max-w-lg" action={formAction}>
      <div className="w-full px-3 mb-4">
        <FormField
          name="username"
          id="username"
          type="text"
          defaultValue={formValues.username}
          label="Username"
          Component="input"
          error={joinErrorMessages(formErrors.username)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="bio"
          id="bio"
          type="textarea"
          defaultValue={formValues.bio}
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
          defaultValue={formValues.dream}
          options={dreamOptions}
          error={joinErrorMessages(formErrors.dream)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="age"
          id="age"
          type="number"
          min={18}
          label="Age"
          defaultValue={String(formValues.age)}
          Component="input"
          error={joinErrorMessages(formErrors.age)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          name="gender"
          id="gender"
          label="Gender"
          defaultValue={formValues.gender}
          options={genderOptions}
          error={joinErrorMessages(formErrors.gender)}
        />
      </div>

      <div className="w-full text-right px-3 mb-4">
        <SubmitButton />
      </div>
    </form>
  );
}
