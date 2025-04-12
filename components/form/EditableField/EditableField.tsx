import type { Field, Option } from "@/models/form";
import FormField from "../FormField/FormField";
import {
	RiAiGenerate2,
	RiCloseCircleFill,
	RiEditCircleLine,
	RiSave2Fill,
} from "@remixicon/react";
import { getLabel } from "@/utils/getLabel";
import { useState, useEffect } from "react";
import clsx from "clsx";
import type { ZodSchema } from "zod";
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
	aiGeneration?: () => Promise<void>;
	aiText?: string;
	validationSchema?: ZodSchema;
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
	aiGeneration,
	aiText,
	validationSchema,
}: EditableFieldProps) => {
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(initialValue || "");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (aiText) {
			setValue("");
			setValue(aiText);
		}
	}, [aiText]);

	const handleToggleEdit = () => {
		setEditing(!editing);
	};

	const validateValue = (value: string) => {
		if (validationSchema) {
			const result = validationSchema.safeParse(
				field === "age" ? Number(value) : value
			);
			if (!result.success) {
				setError(result.error.errors[0].message);
				return false;
			}
			setError(null);
			return true;
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
		>
	) => {
		setValue(e.target.value);
	};

	const handleSave = async () => {
		if (!validateValue(value)) return;
		setValue(value.trim());
		setEditing(false);
		await onSave(field, value, label);
	};

	const handleDiscard = () => {
		setValue(initialValue);
		setEditing(false);
	};

	return (
		<div className="border-b-2 border-gray-200 w-full">
			<div className="flex items-center mb-2">
				<label
					htmlFor={`field-${field}`}
					className={clsx(
						"text-slate-700 block uppercase tracking-wide text-slate-700 text-sm font-bold",
						showLabel ? "" : "visually-hidden"
					)}
				>
					{label}
				</label>

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
						error={error || ""}
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
						{aiGeneration && (
							<button type="button" onClick={aiGeneration}>
								<RiAiGenerate2 />
							</button>
						)}
					</div>
				</>
			) : (
				<>
					{component === "select" && options ? (
						<p
							className={`mb-2 bg-gray-200 rounded-full w-fit px-2 py-1 ${className}`}
						>
							{getLabel(options, String(initialValue))}
						</p>
					) : (
						<p className={`mb-2 ${className} flex items-center`}>
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
