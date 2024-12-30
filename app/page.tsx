import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1 className="font-primary">Dreams</h1>
      <Link href="/login" className="mt-3">
        Login
      </Link>
    </div>
  );
}
