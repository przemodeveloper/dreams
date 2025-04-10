import Loader from "@/components/loader/Loader";

export default function LoadingScreen() {
	return (
		<div className="flex justify-center items-center flex-col h-screen">
			<h1 className="font-primary mb-2 text-emerald-600">Dreams</h1>
			<Loader />
		</div>
	);
}
