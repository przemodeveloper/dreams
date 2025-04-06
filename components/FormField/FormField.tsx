import { clsx } from "clsx";

interface FormFieldProps {
	name: string;
	id: string;
	type?: string;
	required?: boolean;
	label?: string;
	Component: "input" | "textarea" | "select";
	rows?: number;
	value?: string;
	defaultValue?: string;
	min?: number;
	max?: number;
	error?: string;
	options?: { value: string; label: string }[];
	onChange?: (
		e: React.ChangeEvent<
			HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
		>
	) => void;
	className?: string;
	keyValue?: string;
	placeholder?: string;
}

export default function FormField({
	name,
	id,
	type,
	required,
	label,
	Component,
	value,
	defaultValue,
	rows,
	min,
	max,
	error,
	options,
	onChange,
	className,
	placeholder,
	keyValue,
}: FormFieldProps) {
	const classes = clsx(
		"font-secondary appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none",
		error ? "bg-red-100" : "bg-gray-200",
		className
	);
	return (
		<>
			{label && (
				<label
					className="font-secondary block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
					htmlFor={id}
				>
					{label}
				</label>
			)}
			{Component === "select" ? (
				<Component
					className={classes}
					onChange={onChange}
					{...(value ? { value } : {})}
					{...(defaultValue ? { defaultValue } : {})}
					name={name}
					{...(placeholder ? { placeholder } : {})}
					required={required}
					id={id}
					key={keyValue}
				>
					{options?.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Component>
			) : (
				<Component
					className={classes}
					type={type}
					onChange={onChange}
					{...(placeholder ? { placeholder } : {})}
					{...(value ? { value } : {})}
					{...(defaultValue ? { defaultValue } : {})}
					name={name}
					{...(Component === "textarea" ? { rows } : {})}
					{...(type === "number" && min ? { min } : {})}
					{...(type === "number" && max ? { max } : {})}
					required={required}
					id={id}
				/>
			)}
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</>
	);
}
