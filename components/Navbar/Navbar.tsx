import Link from "next/link";
import { useUserContext } from "@/context/user-context";
import Image from "next/image";
import AvatarImage from "@/assets/default-avatar.png";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { RiLogoutBoxLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const { user } = useUserContext();
	const router = useRouter();

	const userImage = user?.images?.find((image) => Boolean(image.downloadUrl));

	const handleSignOut = async () => {
		await signOut(auth);
		router.push("/");
	};

	return (
		<nav className="bg-black text-white p-4 sticky top-0 z-50">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-xl font-bold font-primary">
					Dreams
				</Link>
				<div className="flex items-center gap-4">
					{!user ? (
						<Link
							href="/register"
							className="hover:text-gray-300 transition-colors"
						>
							Need account?
						</Link>
					) : (
						<div className="flex items-center gap-4">
							<div className="relative w-10 h-10 rounded-full overflow-hidden">
								<Image
									src={userImage?.downloadUrl || AvatarImage}
									alt="User avatar"
									fill
									className="object-cover"
								/>
							</div>
							<button
								type="button"
								title="Sign out"
								className="text-white"
								onClick={handleSignOut}
							>
								<RiLogoutBoxLine />
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
