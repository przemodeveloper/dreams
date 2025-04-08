import Link from "next/link";
import { useUserContext } from "@/context/user-context";
import Image from "next/image";
import AvatarImage from "@/assets/default-avatar.png";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { RiLogoutBoxLine } from "@remixicon/react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const Navbar = () => {
	const { isLoggedIn, user } = useUserContext();
	const router = useRouter();
	const pathname = usePathname();

	const userImage = user?.images?.find((image) => Boolean(image.downloadUrl));

	const handleSignOut = async () => {
		await signOut(auth);
		router.push("/");
	};

	return (
		<nav className="bg-gray-50 text-white p-4 sticky top-0 z-50 h-[60px]">
			<div className="container mx-auto flex justify-between h-full items-center">
				<Link
					href="/"
					className="text-xl font-bold font-primary text-emerald-600"
				>
					Dreams
				</Link>
				<div className="flex items-center gap-4">
					{!isLoggedIn ? (
						<Link
							href="/register"
							className={clsx(
								"transition-colors",
								pathname === "/register"
									? "text-emerald-600 border-b-2 border-emerald-600"
									: "text-slate-500"
							)}
						>
							Need account?
						</Link>
					) : (
						<div className="flex items-center gap-4">
							<div className="relative w-10 h-10 rounded-full overflow-hidden">
								<Image
									src={userImage?.downloadUrl || AvatarImage}
									alt="User image"
									fill
									className="object-cover"
								/>
							</div>
							<button
								type="button"
								title="Sign out"
								className="text-slate-500"
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
