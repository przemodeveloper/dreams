import type { Field, Option } from "@/models/form";
import FormField from "../FormField/FormField";
import Select from "../Select/Select";
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
	component: string;
	initialValue: string;
	options?: Option[];
	onSave: (field: Field, value: string, label: string) => Promise<void>;
}

export const EditableField = ({
	field,
	label,
	type,
	component,
	initialValue,
	options,
	onSave,
}: EditableFieldProps) => {
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(initialValue);

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
			<div className="flex items-center">
				<label
					htmlFor={`field-${field}`}
					className="font-secondary text-lg font-bold"
				>
					{label}
				</label>
				{!editing && (
					<div className="flex items-center">
						<button
							type="button"
							className="ml-1"
							title={`Edit ${label}`}
							onClick={handleToggleEdit}
						>
							<RiEditCircleLine size="20px" />
						</button>
					</div>
				)}
			</div>

			{editing ? (
				<>
					{(component === "textarea" || component === "input") && (
						<FormField
							name={field}
							id={`field-${field}`}
							type={type || "text"}
							value={value}
							onChange={handleChange}
							Component={component}
							{...(component === "textarea" ? { rows: 4 } : {})}
						/>
					)}
					{component === "select" && options && (
						<Select
							keyValue={value}
							name={field}
							id={`field-${field}`}
							value={value}
							options={options}
							onChange={handleChange}
						/>
					)}
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
						<p className="font-secondary mb-2 bg-gray-200 rounded-full w-fit px-2 py-1 text-md">
							{getLabel(options, String(initialValue))}
						</p>
					) : (
						<p className="font-secondary mb-2 text-lg">{initialValue}</p>
					)}
				</>
			)}
		</div>
	);
};
