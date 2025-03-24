"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="text-white flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-3xl">Welcome to quiz app</h1>
      <p className="font-bold">Test your knowledge and answer the questions.</p>
      <button
        className="m-4 cursor-pointer px-3 py-2 border-0 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        onClick={() => router.push("/choices")}
      >
        Start Quiz
      </button>
    </div>
  );
}
