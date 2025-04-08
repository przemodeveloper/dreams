import type { RemixiconComponentType } from "@remixicon/react";

const InterestsListItem = ({
	interest,
	isSelected,
	onClick,
}: {
	interest: { name: string; icon: RemixiconComponentType };
	isSelected: boolean;
	onClick: (interest: string) => void;
}) => {
	return (
		<li key={interest.name}>
			<button
				type="button"
				className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
					isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-800"
				}`}
				key={interest.name}
				title={`${isSelected ? "Deselect" : "Select"} ${interest.name}`}
				onClick={() => onClick(interest.name)}
			>
				<span>{interest.name}</span> <interest.icon />
			</button>
		</li>
	);
};

export default InterestsListItem;
