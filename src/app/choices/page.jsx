"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Choices() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState("9");
  const [gameMode, setGameMode] = useState("10");

  const startQuiz = () => {
    if (!difficulty) return alert("Please choose a difficulty level!");
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
            <button
              className={`px-6 py-2 rounded-lg transition-all ${
                difficulty === "easy"
                  ? "bg-green-600"
                  : "bg-green-500 hover:bg-green-700"
              }`}
              onClick={() => setDifficulty("easy")}
            >
              easy
            </button>
            <button
              className={`px-6 py-2 rounded-lg transition-all ${
                difficulty === "medium"
                  ? "bg-yellow-600"
                  : "bg-yellow-500 hover:bg-yellow-700"
              }`}
              onClick={() => setDifficulty("medium")}
            >
              middle
            </button>
            <button
              className={`px-6 py-2 rounded-lg transition-all ${
                difficulty === "hard"
                  ? "bg-red-600"
                  : "bg-red-500 hover:bg-red-700"
              }`}
              onClick={() => setDifficulty("hard")}
            >
              difficult
            </button>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">classification 📚</h2>
          <select
            className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="9">General knowledge</option>
            <option value="18">Computer science</option>
            <option value="21">sports</option>
            <option value="23">history</option>
            <option value="24">politics</option>
          </select>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Game mode 🎮</h2>
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
          className="px-6 py-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          onClick={startQuiz}
        >
          Start the test 🚀
        </button>
      </div>
    </div>
  );
}
