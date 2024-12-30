import NavLink from "@/components/NavLink/NavLink";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1 className="font-primary">Dreams</h1>
      <NavLink href="/login" className="mt-3 text-lg">
        Login
      </NavLink>
    </div>
  );
}
