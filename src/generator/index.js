import Storage from '../js/utils/data.js'

document.addEventListener('DOMContentLoaded', function() {
    const discipline = 'Фронтенд разработка';
    const name_modules = ['Веб-верстка', 'JavaScript', 'Система контроля версий Git',
        'Онлайн сессии по Веб-разработке', 'Универсальные знания программиста'];
    const points_modules = [35, 35, 5, 15, 10];

    const name_lessons = [['Вводный модуль', 'HTML', 'Основы CSS', 'Основы JavaScript', 'Адаптивность и кроссбраузерность',
        'Оформление', 'Инструменты верстальщика'],['Знакомство с языком', 'Основы', 'Функции', 'Массивы и объекты',
        'Замыкания', 'Объекты и конструкторы', 'Объектно-ориентированное программирование', 'Разное',
        'JavaScript в браузере, DOM', 'Web API', 'Клиент и сервер', 'jQuery', 'Современный JavaScript, ES6',
        'Сборка проектов', 'React', 'Redux'],['Версии программного кода', 'Установка Git', 'Индекс и частичные коммиты',
        'Сравнение версий', 'Отмена изменений и откат версий', 'Репозитории и коллективная работа',
        'Ветки. Создание и управление', 'Слияние и разрешение конфликтов', 'Полезные инструменты', 'Правила работы с Git'],
        ['Верстка макета с нуля', 'Библиотека jQuery', 'Адаптация макета под мобильные устройства',
        'Практикум по интерактивным элементам', 'Что такое Webpack', 'Сборка проекта на Gulp и обзор препроцессора Sass',
        'Анимация в CSS', 'Создание блога на WordPress', 'Вёрстка писем'],
        ['Как стать первоклассным программистом и чем он отличается от кодера', 'Какими soft skills должен обладать программист',
        'Как общаться по почте и эффективно работать с ней', 'Карта развития для разработчиков',
        'Data driven подход к продуктивности — инсайты из данных миллиона людей',
        'Вёрстка email-рассылок. Советы на реальных примерах', 'Личный бренд разработчика'
        ]];
    const types = ['lec', 'sem', 'rk', 'ex'];
    const types_v = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];

    const marks = [['Отлично', 9], ['Хорошо', 6], ['Требуется доработка', 3], ['Не сдано', 0]];
    const marks_v = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3];

    const homeworks = [['Тестовое задание', 'Верстка проекта', 'Одностраничный сайт', 'Адаптивная верстка', 'Разбиение проекта на модули'],
        ['Тестовое задание', 'Клиент-серверное приложение', 'Сайт на React', 'Обращение с DOM', 'Параллельное программирование'],
        ['Тестовое задание', 'Задачи на разрешение конфликтов'],
        ['Анимация', 'Адаптивная верстка', 'Верстка с Bootstrap', 'Верстка с препроцессарами'],
        ['Составление писем', 'Составление резюме', 'Верстка писем']];

    const desc_hw = 'Для проверки и самопроверки вы должны выполнить очень простое задание,' +
        'за которое мы поставим вам целых пять баллов. Условие задания находится в репозитории на гитхабе,' +
        'а список вариантов в этой таблице. В этом задании проверяются ваши навыки работы с гитом и базовые знания JavaScript. ';

    const desc_lesson = '- Работа браузера, связь и взаимодействие HTML, CSS и JS в браузере;<br/>' +
        '- DOM и браузерные события. Структура SPA (Single Page Application);<br/>' +
        '- Основы HTTP, методы HTTP;<br/>' +
        '- Организация работы с сетью из браузера. Авторизация с использованием cookies.';
    Storage.init();
    Storage.setNameDiscipline(discipline);

    // Создание модулей
    name_modules.map((item, index) => {
        Storage.createModule(item, points_modules[index]);
    });

    // Создание занятий
    for(let i = 0; i < name_lessons.length; i++) {
        for(let j = 0; j < name_lessons[i].length; j++) {
            Storage.createLesson(name_lessons[i][j], types[randomElement(types_v)], desc_lesson, i);
        }
    }

    // Создание дз
    for(let i = 0; i < name_lessons.length; i++) {
        let num_hw = 0;
        for (let j = 0; j < name_lessons[i].length; j++) {
            if (randomNum(2) && homeworks[i].length !== num_hw) {
                const start_lesson = i + '_' + j;
                const end_lesson = i + '_' + (j + randomNum(name_lessons[i].length - j));
                Storage.createHomework(homeworks[i][num_hw],
                                            desc_hw,
                                            start_lesson,
                                            end_lesson,
                                            randomDate(new Date(2020, 0, 1), new Date()));
                num_hw++;
            }
        }
    }

    // Создание оценок занятиям
    for(let i = 0; i < name_lessons.length; i++) {
        for(let j = 0; j < name_lessons[i].length; j++) {
            const num = randomNum(100);
            for(let k = 0; k < num; k++) {
                const mark = marks[randomElement(marks_v)];
                Storage.createMarkLesson(mark[0], mark[1] + randomNum(3), i, j);
            }
        }
    }

    // Создание оценок дз
    for(let i = 0; i < Storage.getHomeworks().length; i++) {
        const num = randomNum(100);
        for(let k = 0; k < num; k++) {
            const mark = marks[randomElement(marks_v)];
            Storage.createMarkHomework(mark[0], mark[1] + randomNum(3), i);
        }
    }

    const jsonData = JSON.stringify(Storage.getStore());
    download(jsonData, 'data.json', 'text/plain');
});

function download(content, fileName, contentType) {
    const el = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    el.href = URL.createObjectURL(file);
    el.download = fileName;
    el.click();
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomElement(arr) {
    return arr[Math.floor(arr.length * Math.random())]
}

function randomNum(num) {
    return Math.floor((num) * Math.random());
}