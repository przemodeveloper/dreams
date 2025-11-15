import Link from "next/link";
import Image from "next/image";
import AvatarImage from "@/public/default-avatar.png";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { RiLogoutBoxLine } from "@remixicon/react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { ROUTES } from "@/routes/routes";
import { deleteToken } from "@/lib/api/set-token";
import { useUserStore } from "@/hooks/useUserStore";

const Navbar = () => {
  const { profile, clear, hydrated } = useUserStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  const userImage = profile?.images?.find((image) =>
    Boolean(image.downloadUrl)
  );

  const handleSignOut = async () => {
    await signOut(auth);
    clear();
    await deleteToken();

    router.push(ROUTES.HOME);
  };

  if (!hydrated) return null;

  return (
    <nav className="bg-gray-100 border-b border-emerald-600 text-white p-4 sticky top-0 z-50 h-[60px]">
      <div className="container mx-auto flex justify-between h-full items-center">
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold font-primary text-emerald-600"
        >
          Dreams
        </Link>
        <div className="flex items-center gap-4">
          {!profile ? (
            <>
              <Link
                href={ROUTES.LOGIN}
                className={clsx(
                  "transition-colors",
                  pathname === ROUTES.LOGIN
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-slate-500"
                )}
              >
                Login
              </Link>
              <Link
                href={ROUTES.REGISTER}
                className={clsx(
                  "transition-colors",
                  pathname === ROUTES.REGISTER
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-slate-500"
                )}
              >
                Need account?
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href={ROUTES.MEET_DREAMERS}
                className={clsx(
                  "transition-colors",
                  pathname === ROUTES.MEET_DREAMERS
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-slate-500"
                )}
              >
                Meet Dreamers
              </Link>
              <Link
                href={ROUTES.USER_PROFILE}
                className="relative w-10 h-10 rounded-full overflow-hidden"
              >
                <Image
                  src={userImage?.downloadUrl || AvatarImage}
                  loading="eager"
                  priority
                  alt="User image"
                  fill
                  className="object-cover"
                />
              </Link>
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
