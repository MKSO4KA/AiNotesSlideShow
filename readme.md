# 📝 Smart Notes Generator — Pitch Deck

> Система интеллектуального синтеза и структурирования STEM-конспектов.

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=for-the-badge&logo=github)](https://mkso4ka.github.io/AiNotesSlideShow/)
[![Tech Stack](https://img.shields.io/badge/tech-HTML5%20|%20JS%20|%20CSS3-blue?style=for-the-badge)](https://mkso4ka.github.io/AiNotesSlideShow/)

---

## 🚀 О проекте

**Smart Notes Generator** — это концепция образовательной платформы, которая решает проблему «цифрового мусора» в смартфонах студентов. Вместо гигабайтов видеолекций и сотен разрозненных фотографий доски, система создает легкие, интерактивные слайд-касты с текстовым поиском.

### Ключевые технологические фишки (Core Engine):
*   **👻 Ghost Removal:** Алгоритм на базе ИИ, который делает лектора прозрачным, позволяя видеть записи на доске без преград.
*   **📉 Delta-Sampling:** Умная запись кадров — сохраняется только то мгновение, когда на доске реально изменилась информация.
*   **📦 Data Optimization:** Сжатие данных лекции с **3.5 ГБ (видео)** до **150 МБ (слайд-каст)** без потери качества.
*   **🎯 STEM-Focus:** Идеальное распознавание формул, графиков и чертежей.

---

## 🛠 Технологический стек

Презентация построена как полноценное Web-приложение:
*   **Engine:** Чистый JavaScript (Vanilla JS) с асинхронной подгрузкой модулей.
*   **Graphics:** [Chart.js](https://www.chartjs.org/) для интерактивных радаров и графиков.
*   **Animations:** [GSAP](https://greensock.com/gsap/) (GreenSock) для плавных переходов.
*   **Styling:** Современный CSS3 (Custom Properties, Glassmorphism, Bento-grid).

---

## 🕹 Навигация по презентации

Вы можете просматривать слайды несколькими способами:
- **Клавиатура:** Стрелки `←` `→` или `Space`.
- **Мышь:** Колесо прокрутки (Scroll).
- **Интерфейс:** Кнопки управления в нижнем углу экрана.

---

## 📂 Структура репозитория

```text
├── .github/workflows/  # Автоматический деплой на GitHub Pages
├── data.json           # Данные для графиков и матриц
├── index.html          # Главная точка входа
├── script.js           # Логика слайдера и инициализация Chart.js
├── style.css           # Дизайн и анимации
└── slides*.html        # Контентные модули слайдов
```

---

## 👨‍💻 Автор
Проект разработан в рамках учебного курса по предпринимательству.

**Посмотреть презентацию:** [mkso4ka.github.io/AiNotesSlideShow](https://mkso4ka.github.io/AiNotesSlideShow/)