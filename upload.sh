#!/bin/bash

# Проверяем, инициализирован ли Git
if [ ! -d ".git" ]; then
    echo "Инициализация Git..."
    git init
    # Замени ссылку на свою!
    git remote add origin https://github.com/MKSO4KA/AiNotesSlideShow
    git branch -M main
fi

# Добавляем все изменения
git add .

# Спрашиваем описание изменений (commit message)
echo "Введите описание изменений (или нажмите Enter для 'Update presentation'):"
read message
if [ -z "$message" ]; then
    message="Update presentation"
fi

# Делаем коммит
git commit -m "$message"

# Отправляем в репозиторий
echo "Отправка на GitHub..."
git push -u origin main

echo "Готово!"
sleep 2