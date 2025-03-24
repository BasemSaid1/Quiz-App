"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function Results() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");
  const totalQuestions = parseInt(searchParams.get("totalQuestions") || "10");
  const gameMode = searchParams.get("mode") || "10";
  const router = useRouter();

  const getMessage = () => {
    if (gameMode === "marathon") {
      return `🏆 You answered ${score} questions correctly! Keep improving your skills!`;
    } else if (gameMode === "timed") {
      return score > totalQuestions / 2
        ? "⏳ Great job! You scored well in the timed challenge!"
        : "⏱ Not bad! Try again to get a better score!";
    } else {
      if (score === totalQuestions)
        return "🎉 Excellent! You got a perfect score!";
      if (score >= totalQuestions / 2)
        return "👍 Very good! You have great knowledge!";
      if (score >= 3) return "🙂 Not bad! You can try again.";
      return "😞 Don't worry, try again and get a better score!";
    }
  };

  const shareResults = () => {
    const text = `I got ${score} out of ${totalQuestions} in the "${gameMode}" mode! Can you achieve a better result? Try now! 🔥`;
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: "My test result!",
          text,
          url,
        })
        .then(() => console.log("تمت المشاركة بنجاح"))
        .catch((error) => console.error("خطأ في المشاركة:", error));
    } else {
      const shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
      window.open(shareLink, "_blank");
    }
  };

  return (
    <div className=" max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-4">
        Your result 📊: {score} / {totalQuestions}
      </h1>
      <p className="text-lg mb-4">{getMessage()}</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          Try again 🔄
        </button>
        <button
          onClick={shareResults}
          className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
        >
          Share the result 📢
        </button>
      </div>
    </div>
  );
}
