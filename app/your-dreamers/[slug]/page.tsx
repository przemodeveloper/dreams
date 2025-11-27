import YourDreamersLayout from "@/components/your-dreamers-layout/YourDreamersLayout";

export default async function YourDreamersPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	return <YourDreamersLayout slug={slug} />;
}
