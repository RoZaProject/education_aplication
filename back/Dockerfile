FROM python:3.11-slim

# Настройка времени и Python
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TZ=Europe/Moscow

# Создаем директорию и пользователя (без root)
RUN mkdir -p /usr/src/app && \
    groupadd -r appuser && \
    useradd -r -g appuser appuser && \
    chown appuser:appuser /usr/src/app

WORKDIR /usr/src/app

# Установка зависимостей (оптимизировано)
RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq-dev gcc && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    pip install --upgrade pip && \
    rm -rf /var/lib/apt/lists/*

# Копируем зависимости и устанавливаем
COPY --chown=appuser:appuser requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект
COPY --chown=appuser:appuser . .

# Переключаемся на непривилегированного пользователя
USER appuser

# Запускаем FastAPI через Gunicorn (для прода) или Uvicorn (для разработки)
CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:8000", "--workers", "4"]
