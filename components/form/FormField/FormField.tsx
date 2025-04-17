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
		"w-full px-4 py-2 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 transition duration-200",
		error
			? "bg-gray-200 border border-red-400 focus:border-red-400 focus:ring-red-400"
			: "bg-gray-200 border border-gray-300 focus:border-indigo-600 focus:ring-indigo-600",
		className
	);
	return (
		<>
			{label && (
				<label
					className="block uppercase tracking-wide text-slate-700 text-sm font-bold mb-2"
					htmlFor={id}
				>
					{label}
				</label>
			)}
			{Component === "select" ? (
				<Component
					className={classes}
					onChange={onChange}
					value={value ?? ""}
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
					value={value ?? ""}
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
