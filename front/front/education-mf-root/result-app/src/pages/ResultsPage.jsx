import React from "react";
import { LogIn, BookOpen, Menu, BookPlus, Target, Bot } from "lucide-react";

function ResultsPage() {
  const mockResults = Array.from({ length: 27 }, (_, index) => ({
    id: index + 1,
    correct: Math.random() > 0.5, // Random true/false for demonstration
  }));

  const mockAIReview = `
    На основе анализа вашего варианта, я вижу следующие моменты:

    1. Сильные стороны:
       - Отлично справляетесь с задачами на анализ алгоритмов
       - Хорошо решаете задачи на системы счисления

    2. Области для улучшения:
       - Обратите внимание на задачи с базами данных
       - Требуется практика в работе с логическими выражениями

    3. Рекомендации:
       - Уделите больше времени практике заданий типа 2 и 5
       - Попробуйте решить дополнительные задачи на SQL запросы
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
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

              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <a
                  href="/home"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  ПРОБНИК
                </a>
              </button>

              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <a
                  href="/result"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  РЕЗУЛЬТАТ
                </a>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <LogIn className="h-5 w-5" />
                <a
                  href="/auth"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Войти
                </a>
              </button>
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
        {/* Results Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Результаты варианта</h2>
          <div className="flex flex-wrap gap-3">
            {mockResults.map((result) => (
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
                {mockAIReview}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="md:w-1/3 space-y-4">
            <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-start text-left gap-3 text-base font-semibold shadow-md">
              <BookPlus className="h-5 w-5 mt-0.5" />
              <span>Составить новый вариант на основе итогов пробников</span>
            </button>

            <button className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-start text-left gap-3 text-base font-semibold shadow-md">
              <Target className="h-5 w-5 mt-0.5" />
              <span>
                Подборка заданий, в которых вы ошиблись, для отработки
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
