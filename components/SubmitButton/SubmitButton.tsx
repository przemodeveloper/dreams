import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="transition ease-in-out duration-300 border-2 bg-black hover:bg-white hover:border-2 hover:border-black hover:text-black text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      Start your dream
    </button>
  );
}
