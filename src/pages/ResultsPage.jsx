import React from 'react';
import { Link } from "react-router-dom"

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
    </div>
  );
}

export default ResultsPage;
