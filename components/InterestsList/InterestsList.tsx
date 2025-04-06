import { profileInterests } from "@/constants/interests";
import type { RemixiconComponentType } from "@remixicon/react";
import InterestsListItem from "../InterestsListItem/InterestsListItem";

const InterestsList = ({
	selectedInterests,
	onSelectInterest,
}: {
	selectedInterests: string[];
	onSelectInterest: (interest: string) => void;
}) => {
	return (
		<>
			<p className="text-sm font-secondary block uppercase tracking-wide text-gray-700 font-bold mb-2">
				Interests
			</p>
			{Object.entries(profileInterests).map(
				([category, { label, interests }]) => (
					<div className="gap-2 mb-4" key={category}>
						<p className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							{label}
						</p>
						<ul className="flex flex-wrap gap-2">
							{interests.map(
								(interest: { name: string; icon: RemixiconComponentType }) => (
									<InterestsListItem
										key={interest.name}
										interest={interest}
										isSelected={selectedInterests.includes(interest.name)}
										onClick={onSelectInterest}
									/>
								)
							)}
						</ul>
					</div>
				)
			)}
		</>
	);
};

export default InterestsList;
