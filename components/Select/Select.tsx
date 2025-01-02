interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  id: string;
  required?: boolean;
  options: Option[];
  label: string;
}

export default function Select({
  name,
  id,
  required,
  options,
  label,
}: SelectProps) {
  return (
    <>
      <label
        className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <div>
        <select
          className="font-secondary appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          name={name}
          id={id}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
