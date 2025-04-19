import { Profile } from "@/models/profiles";
import Card from "./Card";
import { useState } from "react";

interface SwipeCardsProps {
	profiles: Profile[];
}

const SwipeCards = ({ profiles }: SwipeCardsProps) => {
	const [cards, setCards] = useState<Profile[]>(profiles);

	return (
		<div className="grid min-h-screen place-items-center">
			{cards.map((profile, index) => (
				<Card
					key={profile.id}
					profile={profile}
					setCards={setCards}
					cards={cards}
					index={index}
				/>
			))}
		</div>
	);
};

export default SwipeCards;
