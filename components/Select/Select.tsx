import type { Option } from "@/models/form";

interface SelectProps {
	name: string;
	id: string;
	required?: boolean;
	options: Option[];
	label?: string;
	error?: string;
	value?: string;
	defaultValue?: string;
	keyValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
	name,
	id,
	required,
	options,
	label,
	error,
	value,
	defaultValue,
	keyValue,
	onChange,
}: SelectProps) {
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
			<div>
				<select
					key={keyValue}
					className={`font-secondary appearance-none block w-full ${
						error ? "bg-red-100" : "bg-gray-200"
					} text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
					name={name}
					id={id}
					required={required}
					{...(value ? { value } : {})}
					onChange={onChange}
					{...(defaultValue ? { defaultValue } : {})}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			{error && <p className="text-red-500 text-xs">{error}</p>}
		</>
	);
}
