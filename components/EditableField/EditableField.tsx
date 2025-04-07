import type { Field, Option } from "@/models/form";
import FormField from "../FormField/FormField";
import {
	RiCloseCircleFill,
	RiEditCircleLine,
	RiSave2Fill,
} from "@remixicon/react";
import { getLabel } from "@/utils/getLabel";
import { useState } from "react";

interface EditableFieldProps {
	field: Field;
	label: string;
	type?: string;
	component: "select" | "input" | "textarea";
	initialValue: string;
	options?: Option[];
	onSave: (field: Field, value: string, label: string) => Promise<void>;
	min?: number;
	max?: number;
	className?: string;
	showLabel?: boolean;
}

export const EditableField = ({
	field,
	label,
	type,
	component,
	initialValue,
	options,
	onSave,
	min,
	max,
	className = "",
	showLabel = true,
}: EditableFieldProps) => {
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(initialValue || "");

	const handleToggleEdit = () => {
		setEditing(!editing);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
		>
	) => {
		setValue(e.target.value);
	};

	const handleSave = async () => {
		await onSave(field, value, label);
		setEditing(false);
	};

	const handleDiscard = () => {
		setValue(initialValue);
		setEditing(false);
	};

	return (
		<div className="border-b-2 w-full">
			<div className="flex items-center mb-2">
				{showLabel && (
					<label
						htmlFor={`field-${field}`}
						className="font-secondary block uppercase tracking-wide text-gray-700 text-sm font-bold"
					>
						{label}
					</label>
				)}
				{!editing && showLabel && (
					<button
						type="button"
						className="ml-1"
						title={`Edit ${label}`}
						onClick={handleToggleEdit}
					>
						<RiEditCircleLine size="20px" />
					</button>
				)}
			</div>

			{editing ? (
				<>
					<FormField
						name={field}
						keyValue={value}
						id={`field-${field}`}
						type={type || "text"}
						value={value}
						onChange={handleChange}
						Component={component}
						options={options}
						className={className}
						{...(component === "textarea" ? { rows: 4 } : {})}
						{...(type === "number" && min ? { min } : {})}
						{...(type === "number" && max ? { max } : {})}
					/>

					<div className="flex gap-2 mb-2 justify-end">
						<button
							type="button"
							onClick={handleSave}
							title={`Save ${label} changes`}
						>
							<RiSave2Fill />
						</button>
						<button
							type="button"
							onClick={handleDiscard}
							title={`Discard ${label} changes`}
						>
							<RiCloseCircleFill />
						</button>
					</div>
				</>
			) : (
				<>
					{component === "select" && options ? (
						<p
							className={`font-secondary mb-2 bg-gray-200 rounded-full w-fit px-2 py-1 ${className}`}
						>
							{getLabel(options, String(initialValue))}
						</p>
					) : (
						<p className={`font-secondary mb-2 ${className} flex items-center`}>
							{initialValue}
							{!editing && !showLabel && (
								<button
									type="button"
									className="ml-1"
									title={`Edit ${label}`}
									onClick={handleToggleEdit}
								>
									<RiEditCircleLine size="20px" />
								</button>
							)}
						</p>
					)}
				</>
			)}
		</div>
	);
};
