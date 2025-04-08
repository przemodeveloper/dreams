import { useFormStatus } from "react-dom";

export default function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			type="submit"
			title="Start your dream"
			className="transition ease-in-out duration-300 border-2 border-amber-400 bg-amber-400 hover:bg-white hover:border-2 hover:border-amber-400 hover:text-amber-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
		>
			Start your dream
		</button>
	);
}
