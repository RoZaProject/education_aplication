import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, BookOpen, Menu, BookPlus, Target, Bot } from "lucide-react";

function ResultsPage() {
  const [aiReview, setAiReview] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const baseURL = "http://localhost:8000";
  const token = localStorage.getItem("token");
  const variantId = localStorage.getItem("variant_id");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !variantId) {
      navigate("/register");
      return;
    }

    const fetchReview = async () => {
      try {
        const response = await fetch(
          `${baseURL}/results/${variantId}/ai_review/generate`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          navigate("/register");
          return;
        }
        if (response.status === 404) {
          throw new Error("Результаты по этому варианту не найдены.");
        }
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();
        // data — массив { task_id, text, status }
        setAiReview(data.map((x) => `• ${x.text}`).join("\n"));
        setResults(
          data.map((_, i) => ({
            id: i + 1,
            correct: Math.random() > 0.5,
          }))
        );
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReview();
  }, [token, variantId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">
                <a href="/" style={{ color: "white", textDecoration: "none" }}>
                  RoZa
                </a>
              </span>
              <a
                href="/home"
                className="hover:bg-blue-700 px-4 py-2 rounded-md text-white"
              >
                ПРОБНИК
              </a>
              <a
                href="/result"
                className="hover:bg-blue-700 px-4 py-2 rounded-md text-white"
              >
                РЕЗУЛЬТАТ
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/auth"
                className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2 text-white"
              >
                <LogIn className="h-5 w-5" />
                <span>Войти</span>
              </a>
            </div>
            <button
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Ошибка */}
        {error && (
          <div className="mb-6 text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Результаты */}
        {!error && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Результаты варианта
              </h2>
              <div className="flex flex-wrap gap-3">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium ${
                      result.correct ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {result.id}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* AI Review */}
              <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold">Рецензия ИИ</h2>
                  </div>
                  <div className="whitespace-pre-wrap text-gray-700">
                    {aiReview}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="md:w-1/3 space-y-4">
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-start text-left gap-3 text-base font-semibold shadow-md">
                  <BookPlus className="h-5 w-5 mt-0.5" />
                  <span>Составить новый вариант на основе итогов пробников</span>
                </button>

                <button className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-start text-left gap-3 text-base font-semibold shadow-md">
                  <Target className="h-5 w-5 mt-0.5" />
                  <span>Подборка заданий для отработки ошибок</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
