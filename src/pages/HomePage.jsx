import React, { useState } from "react";
import { LogIn, BookOpen, HelpCircle, Menu, Plus, Minus, Wand2, CheckCircle } from 'lucide-react';

function HomePage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [topicCounts, setTopicCounts] = useState({});
  const [selectedTasks, setSelectedTasks] = useState([]);

  const topics = [
    "Анализ информационных моделей",
    "Построение таблиц истинности логических выражений",
    "Поиск информации в реляционных базах данных",
    "Кодирование и декодирование информации",
    "Анализ и построение алгоритмов для исполнителей",
    "Определение результатов работы простейших алгоритмов",
    "Кодирование и декодирование информации. Передача информации",
    "Перебор слов и системы счисления",
    "Работа с таблицами",
    "Поиск символов в текстовом редакторе",
    "Вычисление количества информации",
    "Выполнение алгоритмов для исполнителей",
    "Организация компьютерных сетей. Адресация",
    "Кодирование чисел. Системы счисления",
    "Преобразование логических выражений",
    "Рекурсивные алгоритмы",
    "Обработки числовой последовательности",
    "Робот-сборщик монет",
    "Выигрышная стратегия. Задание 1",
    "Выигрышная стратегия. Задание 2",
  ];


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

    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content Area (60%) */}
        <main className="md:w-3/5 order-2 md:order-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Вариант</h2>
            
            <div className="space-y-6">
              {selectedTasks.map((task, index) => (
                <div key={task.id} className="border-b pb-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">Задание {index + 1}</h3>
                    <span className="text-gray-500">{task.points} балл{task.points !== 1 ? 'а' : ''}</span>
                  </div>
                  <p className="mt-3 text-gray-700">{task.content}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Введите ответ"
                      className="border rounded-md px-4 py-2 w-48"
                    />
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                      <HelpCircle className="h-5 w-5" />
                      <span>Помощь ИИ</span>
                    </button>
                  </div>
                </div>
              ))}
              {selectedTasks.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    Выберите темы и количество задач справа, затем нажмите "Составить вариант" или "Сгенерировать вариант"
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


export default HomePage;
