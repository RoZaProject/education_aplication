import React, { useState } from 'react';
import { LogIn, BookOpen, Menu } from 'lucide-react';

function LandingPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">Подготовка к ЕГЭ</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <LogIn className="h-5 w-5" />
                <span>Войти</span>
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
    </div>
  );
}

export default LandingPage;
