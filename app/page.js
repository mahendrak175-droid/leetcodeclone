import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Welcome to Next.js 13!!
        <Button>Click me</Button>
      </h1>
    </div>
  );
}
