import type { RemixiconComponentType } from "@remixicon/react";

const InterestsListItem = ({
	interest,
	isSelected,
	onClick,
	readonly = false,
}: {
	interest: { name: string; icon: RemixiconComponentType };
	isSelected: boolean;
	onClick: (interest: string) => void;
	readonly?: boolean;
}) => {
	return (
		<li key={interest.name}>
			{readonly ? (
				<span className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-100 text-slate-700 focus:ring-emerald-600">
					<span>{interest.name}</span>{" "}
					<interest.icon className="text-emerald-600" />
				</span>
			) : (
				<button
					type="button"
					className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
						isSelected
							? "bg-indigo-600 text-white focus:ring-indigo-600"
							: "bg-gray-100 text-slate-700 focus:ring-emerald-600"
					}`}
					key={interest.name}
					title={`${isSelected ? "Deselect" : "Select"} ${interest.name}`}
					onClick={() => onClick(interest.name)}
				>
					<span>{interest.name}</span>{" "}
					<interest.icon
						className={`${isSelected ? "text-white" : "text-emerald-600"}`}
					/>
				</button>
			)}
		</li>
	);
};

export default InterestsListItem;
