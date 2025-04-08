import Link from "next/link";

export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classNames = `text-black hover:underline ${className}`;
  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
