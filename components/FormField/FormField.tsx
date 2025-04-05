import { clsx } from "clsx";
interface FormFieldProps {
	name: string;
	id: string;
	type: string;
	required?: boolean;
	label?: string;
	Component: "input" | "textarea";
	rows?: number;
	value?: string;
	defaultValue?: string;
	min?: number;
	max?: number;
	error?: string;
	onChange?: (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	className?: string;
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
	onChange,
	className,
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
					className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					htmlFor={id}
				>
					{label}
				</label>
			)}
			<Component
				className={classes}
				type={type}
				onChange={onChange}
				{...(value ? { value } : {})}
				{...(defaultValue ? { defaultValue } : {})}
				name={name}
				{...(Component === "textarea" ? { rows } : {})}
				{...(type === "number" && min ? { min } : {})}
				{...(type === "number" && max ? { max } : {})}
				required={required}
				id={id}
			/>
			{error && <p className="text-red-500 text-xs">{error}</p>}
		</>
	);
}
