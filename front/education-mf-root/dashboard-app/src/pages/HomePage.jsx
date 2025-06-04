import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogIn,
  BookOpen,
  HelpCircle,
  Menu,
  Plus,
  Minus,
  CheckCircle,
} from 'lucide-react';

const HomePage = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [topicCounts, setTopicCounts] = useState({});
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [answers, setAnswers] = useState({});
  const baseURL = 'http://localhost:8000';
  const navigate = useNavigate();

  const topics = [
    'Анализ информационных моделей',
    'Построение таблиц истинности логических выражений',
    'Поиск информации в реляционных базах данных',
    'Кодирование и декодирование информации',
    'Анализ и построение алгоритмов для исполнителей',
    'Определение результатов работы простейших алгоритмов',
    'Кодирование и декодирование информации. Передача информации',
    'Перебор слов и системы счисления',
    'Работа с таблицами',
    'Поиск символов в текстовом редакторе',
    'Вычисление количества информации',
    'Выполнение алгоритмов для исполнителей',
    'Организация компьютерных сетей. Адресация',
    'Кодирование чисел. Системы счисления',
    'Преобразование логических выражений',
    'Рекурсивные алгоритмы',
    'Обработки числовой последовательности',
    'Робот-сборщик монет',
    'Выигрышная стратегия. Задание 1',
    'Выигрышная стратегия. Задание 2',
  ];

  const totalTasks = Object.values(topicCounts).reduce((sum, count) => sum + count, 0);

  const updateCount = (topic, increment) => {
    setTopicCounts((prev) => ({
      ...prev,
      [topic]: Math.max(0, (prev[topic] || 0) + (increment ? 1 : -1)),
    }));
  };

  const generateVariant = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Вы не авторизованы');
      return;
    }

    try {
      const res = await fetch(`${baseURL}/users/get_var`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Ошибка при генерации варианта');
      const { variant_id, task_ids } = await res.json();

      // Save variantId for ResultsPage
      localStorage.setItem('variant_id', variant_id);

      // Fetch each task
      const tasks = await Promise.all(
        task_ids.map(async (id) => {
          const tr = await fetch(`${baseURL}/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!tr.ok) throw new Error(`Ошибка при загрузке задачи ${id}`);
          return await tr.json();
        })
      );
      setSelectedTasks(tasks);
      // Reset any previous answers
      setAnswers({});
    } catch (err) {
      alert(err.message);
    }
  };

  const finishVariant = async () => {
    const token = localStorage.getItem('token');
    const variantId = localStorage.getItem('variant_id');
    if (!token || !variantId) {
      alert('Нет текущего варианта или вы не авторизованы');
      return;
    }

    // Build payload
    const payload = {
      result: selectedTasks.map((task) => ({
        id_task: task.id,
        solution: answers[task.id] || '',
      })),
    };

    try {
      const res = await fetch(`${baseURL}/results/${variantId}/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Не удалось завершить вариант');
      // Redirect to results page
      navigate('/result');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <a href="/" className="font-bold text-xl text-white no-underline">
                RoZa
              </a>
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
                className="hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-2 text-white"
              >
                <LogIn className="h-5 w-5" />
                Войти
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

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <main className="md:w-3/5 order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Вариант</h2>
              <div className="space-y-6">
                {selectedTasks.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    Выберите темы и нажмите «Составить вариант»
                  </div>
                )}
                {selectedTasks.map((task, idx) => (
                  <div key={task.id} className="border-b pb-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Задание {idx + 1}
                      </h3>
                      <span className="text-gray-500">
                        {task.points} балл{task.points !== 1 && 'а'}
                      </span>
                    </div>
                    <p className="mt-3 text-gray-700">{task.content}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <input
                        type="text"
                        placeholder="Введите ответ"
                        className="border rounded-md px-4 py-2 w-48"
                        value={answers[task.id] || ''}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [task.id]: e.target.value,
                          }))
                        }
                      />
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <HelpCircle className="h-5 w-5" />
                        Помощь ИИ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="md:w-2/5 order-1 md:order-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Темы</h3>
                <span className="text-sm text-gray-600">
                  Всего задач: {totalTasks}
                </span>
              </div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {topics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <span className="text-sm flex-1">{topic}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        onClick={() => updateCount(topic, false)}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={!topicCounts[topic]}
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-6 text-center">
                        {topicCounts[topic] || 0}
                      </span>
                      <button
                        onClick={() => updateCount(topic, true)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={generateVariant}
                  disabled={totalTasks === 0}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Составить вариант ({totalTasks})</span>
                </button>

                <button
                  onClick={finishVariant}
                  disabled={selectedTasks.length === 0}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Завершить вариант</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
