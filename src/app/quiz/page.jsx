"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Quiz() {
  return (
    <Suspense fallback={<h2 className="text-center text-xl">Loading...</h2>}>
      <QuizComponent />
    </Suspense>
  );
}

function QuizComponent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "general_knowledge";
  const difficulty = searchParams.get("difficulty") || "easy";
  const mode = searchParams.get("mode") || "10";

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const router = useRouter();

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/v2/questions?limit=10&categories=${category}&difficulties=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          console.error("No questions found in API response.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, [category, difficulty]);

  useEffect(() => {
    if (mode === "timed" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      nextQuestion();
    }
  }, [timeLeft, mode]);

  if (loading)
    return <h2 className="text-center text-xl">Loading questions...</h2>;
  if (!questions.length)
    return (
      <h2 className="text-center text-xl">
        No questions found. Try again later. ❌
      </h2>
    );

  const currentQuestion = questions[currentQuestionIndex];

  if (
    !currentQuestion ||
    !currentQuestion.correctAnswer ||
    !currentQuestion.incorrectAnswers
  ) {
    return <h2 className="text-center text-xl">Error loading question...</h2>;
  }

  const answers = [
    ...currentQuestion.incorrectAnswers,
    currentQuestion.correctAnswer,
  ].sort();

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      if (mode === "timed") setTimeLeft(15);
    } else {
      showResults();
    }
  };

  const showResults = () => {
    router.push(
      `/results?score=${score}&totalQuestions=${questions.length}&mode=${mode}`
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">
        {currentQuestion.question.text}
      </h2>
      {mode === "timed" && (
        <p className="text-red-500 font-bold my-3">{timeLeft} Seconds ⏳</p>
      )}
      <ul className="space-y-2">
        {answers.map((answer, index) => (
          <li
            key={index}
            className={`p-3 border rounded-lg cursor-pointer transition ${
              selectedAnswer
                ? answer === currentQuestion.correctAnswer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => !selectedAnswer && handleAnswer(answer)}
          >
            {answer}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-between">
        <button
          onClick={nextQuestion}
          disabled={!selectedAnswer && mode !== "timed"}
          className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
        >
          {currentQuestionIndex + 1 < questions.length ? "Next" : "Show Result"}
        </button>
      </div>
    </div>
  );
}
