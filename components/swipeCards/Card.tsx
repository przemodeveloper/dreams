import {
	DREAM_OPTIONS,
	GENDER_OPTIONS,
	ORIENTATION_OPTIONS,
} from "@/constants/form";
import type { Profile } from "@/models/profiles";
import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useUserStore } from "@/hooks/useUserStore";

interface CardProps {
	profile: Profile;
	setCards: Dispatch<SetStateAction<Profile[]>>;
	cards: Profile[];
	index: number;
	zIndex: number;
}

const Card = ({ profile, setCards, index, zIndex }: CardProps) => {
	const x = useMotionValue(0);
	const { setAccept, setReject } = useUserStore((state) => state);

	const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
	const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

	const isFront = index === 0;

	const rotate = useTransform(() => {
		const offset = isFront ? 0 : index % 2 ? 6 : -6;
		return `${rotateRaw.get() + offset}deg`;
	});

	const handleDragEnd = () => {
		if (Math.abs(x.get()) > 100) {
			if (x.get() > 0) {
				setAccept(profile.id);
			} else {
				setReject(profile.id);
			}
			setCards((prev) => prev.filter((card) => card.id !== profile.id));
		}
	};

	return (
		<motion.div
			className="flex h-fit w-[24rem] origin-bottom flex-col overflow-hidden rounded bg-white hover:cursor-grab active:cursor-grabbing"
			style={{
				gridRow: 1,
				gridColumn: 1,
				x,
				opacity,
				rotate,
				zIndex,
				transition: "0.125s transform",
				boxShadow: isFront ? "0px 0px 30px 0px rgba(0, 0, 0, 0.2)" : "none",
			}}
			animate={{
				scale: isFront ? 1 : 0.9,
			}}
			dragConstraints={{ left: 0, right: 0 }}
			drag={isFront ? "x" : false}
			onDragEnd={handleDragEnd}
		>
			<div className="relative w-full aspect-[3/4]">
				<Image
					src={profile.image.downloadUrl}
					alt={`${profile.username}'s profile`}
					draggable={false}
					fill
					className="object-cover"
				/>
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
			</div>
			<div className="flex flex-1 flex-col gap-1 p-4">
				<div className="flex items-baseline justify-between">
					<div className="flex flex-col gap-1">
						<span className="text-lg font-semibold text-neutral-900">
							{profile.username}
						</span>
						<span className="text-sm font-medium text-emerald-600">
							{DREAM_OPTIONS[profile.dream as keyof typeof DREAM_OPTIONS]}
						</span>
					</div>
					<span className="text-sm font-medium text-neutral-500">
						{profile.age}
					</span>
				</div>
				<p className="text-sm line-clamp-5 text-neutral-600">{profile.bio}</p>
				<span className="text-sm font-medium text-neutral-500">
					{
						ORIENTATION_OPTIONS[
							profile.orientation as keyof typeof ORIENTATION_OPTIONS
						]
					}
				</span>
				<span className="text-sm font-medium text-neutral-500">
					{GENDER_OPTIONS[profile.gender as keyof typeof GENDER_OPTIONS]}
				</span>
			</div>
		</motion.div>
	);
};

export default Card;
