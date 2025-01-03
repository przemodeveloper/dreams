"use client";

import FormField from "../FormField/FormField";
import Select from "../Select/Select";
import { handleSetProfile } from "@/lib/actions";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useActionState } from "react";
import type { InitialFormState } from "@/models/form";
import { joinErrorMessages } from "@/utils/joinErrorMessages";
import {
  dreamOptions,
  genderOptions,
  initialFormState,
  orientationOptions,
} from "./datingProfile.consts";
import useAuthUser from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";

export default function DatingProfileForm() {
  const { user } = useAuthUser();
  const router = useRouter();

  const [state, formAction] = useActionState(
    (prevState: InitialFormState, formData: FormData) => {
      const result = handleSetProfile(prevState, formData, user?.uid);

      console.log("result", result);
      if (result.success) {
        router.push("/user-profile");
      }
      return result;
    },
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
          defaultValue={formValues.username || ""}
          label="Username"
          Component="input"
          error={joinErrorMessages(formErrors.username)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          keyValue={formValues.dream}
          name="dream"
          id="dream"
          label="Dream"
          defaultValue={formValues.dream || ""}
          options={dreamOptions}
          error={joinErrorMessages(formErrors.dream)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="bio"
          id="bio"
          type="textarea"
          defaultValue={formValues.bio || ""}
          label="Bio"
          Component="textarea"
          rows={4}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <FormField
          name="age"
          id="age"
          type="number"
          min={18}
          label="Age"
          defaultValue={formValues.age}
          Component="input"
          error={joinErrorMessages(formErrors.age)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          keyValue={formValues.gender}
          name="gender"
          id="gender"
          label="Gender"
          defaultValue={formValues.gender || ""}
          options={genderOptions}
          error={joinErrorMessages(formErrors.gender)}
        />
      </div>

      <div className="w-full px-3 mb-4">
        <Select
          keyValue={formValues.orientation}
          name="orientation"
          id="orientation"
          label="Sexual Orientation"
          defaultValue={formValues.orientation || ""}
          options={orientationOptions}
          error={joinErrorMessages(formErrors.orientation)}
        />
      </div>

      <div className="w-full text-right px-3 mb-4">
        <SubmitButton />
      </div>
    </form>
  );
}
