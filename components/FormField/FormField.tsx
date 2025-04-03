interface FormFieldProps {
	name: string;
	id: string;
	type: string;
	required?: boolean;
	label?: string;
	Component: "input" | "textarea";
	rows?: number;
	value?: string;
	min?: number;
	max?: number;
	error?: string;
	onChange?: (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
}

export default function FormField({
	name,
	id,
	type,
	required,
	label,
	Component,
	value,
	rows,
	min,
	max,
	error,
	onChange,
}: FormFieldProps) {
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
				className={`font-secondary appearance-none block w-full  ${
					error ? "bg-red-100" : "bg-gray-200"
				} text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
				type={type}
				onChange={onChange}
				value={value}
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
