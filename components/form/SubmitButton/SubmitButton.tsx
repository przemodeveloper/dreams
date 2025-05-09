import { useFormStatus } from "react-dom";

export default function SubmitButton({
	title,
	text,
}: {
	title: string;
	text: string;
}) {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			type="submit"
			title={title}
			className="transition ease-in-out duration-300 border-2 border-indigo-600 bg-indigo-600 hover:bg-white hover:border-2 hover:border-indigo-600 hover:text-indigo-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
		>
			{text}
		</button>
	);
}
