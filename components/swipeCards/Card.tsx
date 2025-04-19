import { Profile } from "@/models/profiles";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Dispatch, SetStateAction } from "react";

interface CardProps {
	profile: Profile;
	setCards: Dispatch<SetStateAction<Profile[]>>;
	cards: Profile[];
	index: number;
}

const Card = ({ profile, setCards, cards, index }: CardProps) => {
	const x = useMotionValue(0);

	const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
	const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

	const isFront = profile.id === cards[cards.length - 1].id;

	const rotate = useTransform(() => {
		const offset = isFront ? 0 : index + (1 % 2) ? 6 : -6;
		return `${rotateRaw.get() + offset}deg`;
	});

	const handleDragEnd = () => {
		if (Math.abs(x.get()) > 50) {
			setCards((prev) => prev.filter((card) => card.id !== profile.id));
		}
	};

	return (
		<motion.img
			src={profile.image.downloadUrl}
			alt={profile.username}
			className="h-96 w-72 rounded object-cover hover:cursor-grab active:cursor-grabbing"
			style={{ gridRow: 1, gridColumn: 1, x, opacity, rotate }}
			drag="x"
			loading="eager"
			decoding="sync"
			fetchPriority="high"
			dragConstraints={{
				left: 0,
				right: 0,
			}}
			onDragEnd={handleDragEnd}
		/>
	);
};

export default Card;
