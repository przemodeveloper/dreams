import {
  DREAM_OPTIONS,
  GENDER_OPTIONS,
  ORIENTATION_OPTIONS,
  initialLoginFormState,
  initialRegisterFormState,
  initialSetupProfileFormState,
} from "@/constants/form";
import { imageRefIds } from "@/constants/user-profile";
import { auth, db, storage } from "@/firebase";
import type { ImageObject } from "@/hooks/useManageUser";
import type {
  InitialSetupProfileFormState,
  InitialRegisterFormState,
  InitialLoginFormState,
} from "@/models/form";
import { ROUTES } from "@/routes/routes";
import { uploadImage } from "@/utils/uploadImage";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { z } from "zod";

const enumFromRecord = <const T extends Record<string, string>>(
  record: T,
  params?: z.RawCreateParams
) =>
  z.enum(
    Object.keys(record) as [keyof T & string, ...(keyof T & string)[]],
    params
  );

const datingProfileSchema = z.object({
  age: z
    .number({ required_error: "Age is required." })
    .min(18, "You must be at least 18 years old."),
  username: z.string({ required_error: "Username is required." }).min(3, {
    message: "Username must be at least 3 characters.",
  }),
  bio: z.string().optional(),
  dream: enumFromRecord(DREAM_OPTIONS, {
    required_error: "Dream is required.",
  }),
  gender: enumFromRecord(GENDER_OPTIONS, {
    required_error: "Gender is required.",
  }),
  orientation: enumFromRecord(ORIENTATION_OPTIONS, {
    required_error: "Sexual orientation is required.",
  }),
  interests: z.string({
    required_error: "At least 1 interest is required.",
  }),
  location: z
    .object({
      address: z.string({
        required_error: "Address is required.",
      }),
      coords: z.object({
        lat: z.number().optional(),
        lng: z.number().optional(),
      }),
    })
    .required(),
});

export type UserProfile = z.infer<typeof datingProfileSchema> & {
  userId: string;
  images: ImageObject[];
  acceptedProfiles: string[];
  rejectedProfiles: string[];
};

const registerSchema = z
  .object({
    email: z.string({ required_error: "Email is required." }).email({
      message: "Invalid email address.",
    }),
    password: z.string({ required_error: "Password is required." }).min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required." })
      .min(8, {
        message: "Confirm password must be at least 8 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email({
    message: "Invalid email address.",
  }),
  password: z.string({ required_error: "Password is required." }).min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export async function handleLogin(
  prevState: InitialLoginFormState,
  formData: FormData
) {
  const loginUser = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };

  const result = loginSchema.safeParse(loginUser);

  if (result?.success) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginUser.email,
      loginUser.password
    );

    const authToken = await userCredential.user.getIdToken();

    return {
      success: true,
      formValues: loginUser,
      formErrors: {},
      authToken,
      userId: userCredential.user.uid,
      emailVerified: userCredential.user.emailVerified,
    };
  }

  return {
    success: result?.success,
    formValues: loginUser,
    formErrors:
      result.error?.formErrors?.fieldErrors || initialLoginFormState.formErrors,
    authToken: null,
    userId: null,
    emailVerified: null,
  };
}

export async function handleRegister(
  prevState: InitialRegisterFormState,
  formData: FormData
) {
  const registerUser = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    confirmPassword: String(formData.get("confirmPassword")),
  };

  const result = registerSchema.safeParse(registerUser);

  if (result?.success) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerUser.email,
      registerUser.password
    );

    if (userCredential) {
      const user = userCredential.user;

      if (user) {
        await sendEmailVerification(user, {
          url: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.LOGIN}`,
        });
      }
    }

    return {
      success: true,
      formValues: registerUser,
      formErrors: {},
    };
  }

  return {
    success: result?.success,
    formValues: registerUser,
    formErrors:
      result.error?.formErrors?.fieldErrors ||
      initialRegisterFormState.formErrors,
  };
}

export async function handleSetProfile(
  prevState: InitialSetupProfileFormState,
  formData: FormData,
  location: {
    address: string;
    coords: {
      latitude: number;
      longitude: number;
    };
  } | null,
  userId?: string
) {
  const userProfile = {
    username: String(formData.get("username")) || undefined,
    bio: String(formData.get("bio")) || "",
    dream: String(formData.get("dream")) || undefined,
    age: Number(formData.get("age")) || undefined,
    gender: String(formData.get("gender")) || undefined,
    orientation: String(formData.get("orientation")) || undefined,
    interests: String(formData.get("interests")) || undefined,
    profileCreated: new Date().toISOString(),
    location,
    userId,
  };

  const userImages = imageRefIds
    .map((key) => {
      const file = formData.get(key) as File;
      return file?.size > 0 ? { key, file } : { key };
    })
    .filter(Boolean);

  const result = datingProfileSchema.safeParse(userProfile);

  if (userId && result?.success) {
    const images: ImageObject[] = [];

    if (userImages.length > 0) {
      await Promise.all(
        userImages.map(async (image) => {
          if (image?.file) {
            const res = await uploadImage(image.file, image.key, userId);
            const imageRef = ref(storage, res?.metadata.fullPath);
            const url = await getDownloadURL(imageRef);

            if (url) {
              images.push({
                filePath: res?.metadata.fullPath || "",
                downloadUrl: url,
                imageRefId: image.key,
              });
            }
          } else {
            images.push({
              filePath: "",
              downloadUrl: "",
              imageRefId: image.key,
            });
          }
        })
      );
    }
    await setDoc(doc(db, "profiles", userId), {
      ...userProfile,
      images: images.sort((a, b) => a.imageRefId.localeCompare(b.imageRefId)),
    });
    return {
      ...initialSetupProfileFormState,
      success: true,
    };
  }

  return {
    success: result?.success,
    formValues: userProfile || initialSetupProfileFormState.formValues,
    formErrors:
      result.error?.formErrors?.fieldErrors ||
      initialSetupProfileFormState.formErrors,
  };
}
