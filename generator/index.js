document.addEventListener('DOMContentLoaded', function() {
    const modules = 5;
    const lessons_in_module = 20;
    const homework_in_module = 20;
    const max_marks_in_lesson = 70;

    const max_points_in_module = 10;


    let data = {};

    data.modules = [];
    for (let i = 0; i < modules; i++) {
        data.modules.push({ name: 'Модуль ' + i, num : Number(i), max_points : max_points_in_module });
    }

    let types = ['lec', 'sem', 'rk', 'ex'];

    data.lessons = [];
    for (let i = 0; i < modules; i++) {
        for (let j = 0; j < lessons_in_module; j++) {
            data.lessons.push({ name: 'Занятие ' + j, num : Number(j),
                type : types[Math.floor(types.length * Math.random())], module : Number(i),
                description : ('Описание ' + j + ' ').repeat(10)});
        }
    }

    data.homeworks = [];
    for (let i = 0; i < modules; i++) {
            for (let j = 0; j < homework_in_module; j++) {
                const lesson_start = get_random_lesson(data, i);
                data.homeworks.push({
                    name: 'ДЗ ' + j,
                    lesson_start: lesson_start,
                    lesson_end: lesson_start + Math.floor(4 * Math.random()) + 1,
                    date_end: randomDate(new Date(2020, 0, 1), new Date()),
                    description: ('Описание ' + j + ' ').repeat(10)
                });
            }
    }

    data.marks_lesson = [];
    for (let i = 0; i < modules; i++) {
        for (let j = 0; j < lessons_in_module; j++) {
            const marks = Math.floor(max_marks_in_lesson * Math.random());
            for (let k = 0; k < marks; k++) {
                data.marks_lesson.push({
                    name: 'Оценка ' + k,
                    mark: Math.floor(100 * Math.random()) + 1,
                    lesson_id: i + '_' + j
                });
            }
        }
    }


    data.marks_homework = [];
    for (let i = 0; i < modules; i++) {
        for (let j = 0; j < homework_in_module; j++) {
            const marks = Math.floor(max_marks_in_lesson * Math.random());
            for (let k = 0; k < marks; k++) {
                data.marks_homework.push({
                    name: 'Оценка ' + k,
                    mark: Math.floor(100 * Math.random()) + 1,
                    lesson_id: i + '_' + j
                });
            }
        }
    }


    const jsonData = JSON.stringify(data);
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

function get_random_lesson(data, module_id) {
    let rand = Math.floor((data.lessons.length - 5) * Math.random());

    while (data.lessons[rand].module != module_id) {
        rand = Math.floor((data.lessons.length - 5) * Math.random());
    }
    return data.lessons[rand].num;
}