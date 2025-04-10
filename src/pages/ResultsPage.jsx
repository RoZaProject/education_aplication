import React from 'react';
import { Link } from "react-router-dom";

function ResultsPage() {
  const mockResults = Array.from({ length: 27 }, (_, index) => ({
    id: index + 1,
    correct: Math.random() > 0.5 // Random true/false for demonstration
  }));

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
      </div>
    </div>
  );
}

export default ResultsPage;
