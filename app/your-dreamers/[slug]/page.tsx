import YourDreamersLayout from "@/components/yourDreamers/YourDreamersLayout";

export default function YourDreamersPage({
	params,
}: {
	params: { slug: string };
}) {
	return <YourDreamersLayout slug={params.slug} />;
}
