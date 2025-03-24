"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Choices() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("9");
  const [gameMode, setGameMode] = useState("10");

  const startQuiz = () => {
    router.push(
      `/quiz?difficulty=${difficulty}&category=${category}&mode=${gameMode}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Choose test settings 🎯
        </h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Difficulty level 🧠</h2>
          <div className="grid grid-cols-3 gap-3">
            {["easy", "medium", "hard"].map((level) => (
              <button
                key={level}
                className={`px-6 py-2 rounded-lg transition-all ${
                  difficulty === level
                    ? "bg-opacity-100 ring-2 ring-white"
                    : "bg-opacity-80 hover:bg-opacity-100"
                } ${
                  level === "easy"
                    ? "bg-green-500"
                    : level === "medium"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                onClick={() => setDifficulty(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Classification 📚</h2>
          <select
            className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="9">General Knowledge</option>
            <option value="18">Computer Science</option>
            <option value="21">Sports</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
          </select>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Game Mode 🎮</h2>
          <select
            className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg w-full"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
          >
            <option value="10">10 Questions</option>
            <option value="marathon">Marathon</option>
            <option value="timed">Time Challenge</option>
          </select>
        </div>
        <button
          className={`cursor-pointer px-6 py-3 w-full rounded-lg transition-all ${
            !difficulty
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={startQuiz}
          disabled={!difficulty}
        >
          Start the test 🚀
        </button>
      </div>
    </div>
  );
}
