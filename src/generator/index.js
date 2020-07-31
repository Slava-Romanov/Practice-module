import Storage from '../js/utils/data.js'

document.addEventListener('DOMContentLoaded', function() {
    // const modules = 5;
    // const lessons_in_module = 20;
    // const homework_in_module = 20;
    // const max_marks_in_lesson = 70;
    //
    // const max_points_in_module = 10;

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
        'Data driven подход к продуктивности — инсайты из данных миллиона людей', 'Личный бренд разработчика',
        'Вёрстка email-рассылок. Советы на реальных примерах'
        ]];
    const types = ['lec', 'sem', 'rk', 'ex'];

    Storage.init();

    // Создание модулей
    name_modules.map((item, index) => {
        Storage.createModule(item, points_modules[index]);
    });

    // Создание занятий
    for(let i = 0; i < name_lessons.length; i++) {
        for(let j = 0; j < name_lessons[i].length; j++) {
            Storage.createLesson(name_lessons[i][j], randomElement(types),
                ('Описание ' + j + ' ').repeat(10), i)
        }
    }

    // Создание дз
    for(let i = 0; i < name_lessons.length; i++) {
        let num_hw = 1;
        for (let j = 0; j < name_lessons[i].length; j++) {
            if (randomNum(2)) {
                const start_lesson = i + '_' + j;
                const end_lesson = i + '_' + (j + randomNum(name_lessons[i].length - j));
                Storage.createHomework('ДЗ ' + num_hw,
                                            ('Описание ' + num_hw + ' ').repeat(10),
                                            start_lesson,
                                            end_lesson,
                                            randomDate(new Date(2020, 0, 1), new Date()));
                num_hw++;
            }
        }
    }

    // data.marks_lesson = [];
    // for (let i = 0; i < modules; i++) {
    //     for (let j = 0; j < lessons_modules[i]; j++) {
    //         const marks = Math.floor(max_marks_in_lesson * Math.random());
    //         for (let k = 0; k < marks; k++) {
    //             data.marks_lesson.push({
    //                 name: 'Оценка ' + k,
    //                 mark: Math.floor(100 * Math.random()) + 1,
    //                 lesson_id: i + '_' + j
    //             });
    //         }
    //     }
    // }

    // data.marks_homework = [];
    // for (let i = 0; i < modules; i++) {
    //     for (let j = 0; j < homework_in_module; j++) {
    //         const marks = Math.floor(max_marks_in_lesson * Math.random());
    //         for (let k = 0; k < marks; k++) {
    //             data.marks_homework.push({
    //                 name: 'Оценка ' + k,
    //                 mark: Math.floor(100 * Math.random()) + 1,
    //                 lesson_id: i + '_' + j
    //             });
    //         }
    //     }
    // }

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


function get_random_lesson(data, module_id) {
    let rand = Math.floor((data.lessons[module_id].length - 3) * Math.random());

    // console.log(rand);
    // while (data.lessons[module_id][rand].module != module_id) {
    //     rand = Math.floor((data.lessons.length - 3) * Math.random());
    // }
    return rand;
}