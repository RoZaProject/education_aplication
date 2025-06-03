import React, { useState } from 'react';
import { LogIn, BookOpen, Menu, Newspaper, Bot, ScrollText, Notebook } from 'lucide-react';

function LandingPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://i.ibb.co/k2wWQNL8/image.jpg",
      title: "Подготовка к ЕГЭ по информатике",
      description: "Эффективная подготовка с использованием искусственного интеллекта"
    },
    {
      image: "https://i.ibb.co/Y4QgrKtw/2.jpg",
      title: "Персонализированное обучение",
      description: "Адаптивная система подстраивается под ваш уровень знаний"
    },
    {
      image: "https://i.ibb.co/sp3NgNyN/3.jpg",
      title: "Готовьтесь с уверенностью",
      description: "Регулярная практика и анализ ваших результатов"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl"><a href="/" style={{color: "white", textDecoration:'none'}}> RoZa </a></span>
         
              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <a href="/home" style={{color: "white", textDecoration:'none'}}>ПРОБНИК</a>
              </button>

              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <a href="/result" style={{color: "white", textDecoration:'none'}}>РЕЗУЛЬТАТ</a>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center space-x-2">
                <LogIn className="h-5 w-5" />
                <a href="/auth" style={{color: "white", textDecoration:'none'}}>Войти</a>
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

      {/* Hero Section with Slider */}
      <div className="relative h-[75vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
              <div className="text-center max-w-3xl px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6">
          <button 
            className="flex-1 bg-blue-600 text-white py-6 px-8 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 text-lg font-semibold shadow-lg"
          >
            <Newspaper className="h-6 w-6" />
            <a href='https://fipi.ru/ege'>Все, что нужно знать о ЕГЭ по информатике</a>
          </button>
          
          <button 
            className="flex-1 bg-purple-600 text-white py-6 px-8 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-3 text-lg font-semibold shadow-lg"
          >
            <Bot className="h-6 w-6" />
            <a href='https://github.com/your-repo'>Познакомиться с ИИ</a>
          </button>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
