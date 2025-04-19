import { Profile } from "@/models/profiles";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Dispatch, SetStateAction } from "react";

interface CardProps {
	profile: Profile;
	setCards: Dispatch<SetStateAction<Profile[]>>;
	cards: Profile[];
	index: number;
	zIndex: number;
}

const Card = ({ profile, setCards, index, zIndex }: CardProps) => {
	const x = useMotionValue(0);

	const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
	const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

	const isFront = index === 0;

	const rotate = useTransform(() => {
		const offset = isFront ? 0 : index % 2 ? 6 : -6;
		return `${rotateRaw.get() + offset}deg`;
	});

	const handleDragEnd = () => {
		if (Math.abs(x.get()) > 100) {
			setCards((prev) => prev.filter((card) => card.id !== profile.id));
		}
	};

	return (
		<motion.img
			src={profile.image.downloadUrl}
			alt={profile.username}
			className="h-96 w-72 rounded origin-bottom object-cover hover:cursor-grab active:cursor-grabbing"
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
			drag={isFront ? "x" : false}
			dragConstraints={{
				left: 0,
				right: 0,
			}}
			onDragEnd={handleDragEnd}
			loading="eager"
			decoding="sync"
			fetchPriority="high"
		/>
	);
};

export default Card;
