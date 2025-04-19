import { ImageObject } from "@/hooks/useManageUser";

export interface Profile {
	id: string;
	username: string;
	image: ImageObject;
	age: number;
	bio: string;
}