import React from 'react';
import { Link } from "react-router-dom";
import { Bot } from 'lucide-react';

function ResultsPage() {
  const mockResults = Array.from({ length: 27 }, (_, index) => ({
    id: index + 1,
    correct: Math.random() > 0.5 // Random true/false for demonstration
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
              <span className="font-bold text-xl"><Link to="/" style={{color: "white", textDecoration:'none'}}> Подготовка к ЕГЭ </Link></span>
              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <Link to="/home" style={{color: "white", textDecoration:'none'}}>ПРОБНИК</Link>
              </button>
              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <Link to="/result" style={{color: "white", textDecoration:'none'}}>РЕЗУЛЬТАТ</Link>
              </button>
            </div>
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
                  result.correct ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {result.id}
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default ResultsPage;
