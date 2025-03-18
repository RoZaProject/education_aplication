const HomePage = () => {
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
    <div
      style={{ backgroundColor: "#D9D9D9", height: "100vh", padding: "50px" }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "90%",
          height: "100px",
          borderRadius: "25px",
          margin: "auto",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "white",
            padding: "50px",
            borderRadius: "25px",
            width: "100%",
            marginTop: "25px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "white",
            padding: "50px",
            borderRadius: "25px",
            width: "30%",
            marginTop: "25px",
          }}
        >
          {topics.map((el) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                value="0"
                style={{
                  width: "30px",
                  marginRight: "20px",
                  textAlign: "center",
                }}
              />
              <h2
                name=""
                id=""
                style={{ display: "flex", flexDirection: "column" }}
              >
                {el}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
