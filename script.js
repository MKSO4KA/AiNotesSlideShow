document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('presentation-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('slideCounter');
    
    let slideElements =[];
    let currentSlideIndex = 0;
    let isAnimating = false;
    let nextFileIndex = 1; 
    const pollInterval = 3000; 

    // Хранилище инстансов графиков
    const chartInstances = {};

    // --- 1. ЗАГРУЗКА HTML ---
    async function loadFile(index) {
        const fileName = `slides${index}.html`;
        try {
            const response = await fetch(fileName);
            if (!response.ok) return false; 

            const html = await response.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            const newSlides = Array.from(temp.querySelectorAll('section.slide'));
            if (newSlides.length === 0) return false;

            newSlides.forEach(slide => {
                const globalIndex = slideElements.length + 1;
                slide.classList.add(`slide-${globalIndex}`);
                
                if (globalIndex === 1) {
                    slide.classList.add('active');
                    animateSlide(slide);
                }
                
                container.appendChild(slide);
                slideElements.push(slide);
                
                // Сразу после добавления слайда в DOM - проверяем наличие канвасов
                initChartsInSlide(slide);
            });

            console.log(`✅ Загружен файл: ${fileName}. Слайдов: ${slideElements.length}`);
            updateUI();
            return true;
        } catch (e) { return false; }
    }

    async function startWatcher() {
        const loader = document.getElementById('loader');
        const found = await loadFile(nextFileIndex);
        if (found) {
            if (loader) loader.remove();
            nextFileIndex++;
            startWatcher(); 
        } else {
            setTimeout(startWatcher, pollInterval);
        }
    }

    // --- 2. ЛОГИКА ИНТЕРФЕЙСА ---
    function updateUI() {
        if (counter) counter.textContent = `${currentSlideIndex + 1} / ${slideElements.length}`;
    }

    function animateSlide(slide) {
        if (typeof gsap === 'undefined') return;
        const elements = slide.querySelectorAll('.anim');
        gsap.fromTo(elements, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", clearProps: "all" }
        );
    }

    function goToSlide(index) {
        if (index < 0 || index >= slideElements.length || isAnimating) return;
        isAnimating = true;
        
        const current = slideElements[currentSlideIndex];
        const next = slideElements[index];
        
        if (typeof gsap !== 'undefined') {
            gsap.to(current, {
                opacity: 0, duration: 0.3, ease: "power2.inOut",
                onComplete: () => {
                    current.classList.remove('active');
                    current.style.opacity = ""; 
                    currentSlideIndex = index;
                    updateUI();
                    
                    next.classList.add('active');
                    gsap.fromTo(next, { opacity: 0 }, { 
                        opacity: 1, duration: 0.3, onComplete: () => {
                            isAnimating = false;
                            next.style.opacity = "";
                        } 
                    });
                    animateSlide(next);
                }
            });
        } else {
            current.classList.remove('active');
            currentSlideIndex = index;
            next.classList.add('active');
            updateUI();
            isAnimating = false;
        }
    }

    // --- 3. ИНИЦИАЛИЗАЦИЯ ВСЕХ ГРАФИКОВ (CHART.JS) ---
    Chart.defaults.color = '#4B5563';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    function initChartsInSlide(slide) {
        if (typeof Chart === 'undefined') return;

        // Слайд 2: Проблема (Бар Чарт)
        const problemCanvas = slide.querySelector('#problemChart');
        if (problemCanvas && !chartInstances['problem']) {
            chartInstances['problem'] = new Chart(problemCanvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels:['Инфо-мусор (Статика)', 'Полезный сигнал (Звук/Текст)'],
                    datasets:[{
                        label: 'ГБ',
                        data: [3.1, 0.4],
                        backgroundColor: ['#EF4444', '#4F46E5'],
                        borderRadius: 8
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        }

        // Слайд 5: Оптимизация (Кольцо)
        const compCanvas = slide.querySelector('#compressionChart');
        if (compCanvas && !chartInstances['comp']) {
            chartInstances['comp'] = new Chart(compCanvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels:['Удаленный мусор (3350 MB)', 'Smart Notes (150 MB)'],
                    datasets:[{
                        data: [3350, 150],
                        backgroundColor:['#E5E7EB', '#059669'],
                        borderWidth: 0, hoverOffset: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom' } } }
            });
        }

        // Слайд 6: Аудитория (Кольцо)
        const audCanvas = slide.querySelector('#audienceChart');
        if (audCanvas && !chartInstances['aud']) {
            chartInstances['aud'] = new Chart(audCanvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Создатели (Топ 6%)', 'Пассивные (94%)'],
                    datasets: [{
                        data: [6, 94],
                        backgroundColor:['#4F46E5', '#E5E7EB'],
                        borderWidth: 0, hoverOffset: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom' } } }
            });
        }

        // Слайд 11: Конкуренты (Радар)
        const compRadarCanvas = slide.querySelector('#competitorChart');
        if (compRadarCanvas && !chartInstances['compRadar']) {
            chartInstances['compRadar'] = new Chart(compRadarCanvas.getContext('2d'), {
                type: 'radar',
                data: {
                    labels:['Точность OCR', 'Связь с аудио', 'Скорость обработки', 'Приватность', 'Навигация'],
                    datasets:[
                        { label: 'Smart Notes', data: [5, 5, 4, 5, 5], borderColor: '#4F46E5', backgroundColor: 'rgba(79, 70, 229, 0.2)' },
                        { label: 'General AI', data:[2, 1, 5, 1, 3], borderColor: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.2)' }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false } } } }
            });
        }

        // Слайд 12: ОГРОМНАЯ МАТРИЦА (Радар на 12 параметров)
        const mainRadarCanvas = slide.querySelector('#radarChart');
        if (mainRadarCanvas && !chartInstances['mainRadar']) {
            chartInstances['mainRadar'] = new Chart(mainRadarCanvas.getContext('2d'), {
                type: 'radar',
                data: {
                    labels:[
                        'Тенденция рынка', 'Срок жизни товара', 'Скорость распространения', 
                        'Потенциал рынка (физ)', 'Потенциал рынка ($)', 'Потребность покупателей', 
                        'Рекламная поддержка', 'Отличительные качества', 'Сила конкуренции', 
                        'Срок эксклюзива', 'Уровень цены', 'Уровень качества'
                    ],
                    datasets: [{
                        label: 'Балл (из 5)',
                        data:[3, 5, 3, 2, 2, 4, 2, 4, 3, 4, 5, 4], // Точные данные из ТЗ
                        backgroundColor: 'rgba(5, 150, 105, 0.15)',
                        borderColor: '#059669',
                        borderWidth: 2,
                        pointBackgroundColor: '#4F46E5',
                        pointBorderColor: '#FFF',
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(0,0,0,0.05)' },
                            grid: { color: 'rgba(0,0,0,0.05)' },
                            pointLabels: { color: '#111827', font: { size: 11, weight: '600' } },
                            ticks: { display: false, min: 0, max: 5 }
                        }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }
    }

    // --- 4. НАВИГАЦИЯ ---
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 50) goToSlide(currentSlideIndex + 1);
        else if (e.deltaY < -50) goToSlide(currentSlideIndex - 1);
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goToSlide(currentSlideIndex + 1);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToSlide(currentSlideIndex - 1);
    });

    if(nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
    if(prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));

    // СТАРТ
    startWatcher();
});