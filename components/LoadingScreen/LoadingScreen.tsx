import { Loader } from "../Loader/Loader";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="font-primary mb-2">Dreams</h1>
      <Loader />
    </div>
  );
}
