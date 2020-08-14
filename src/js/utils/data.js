export const dataFileUrl = '/data.json';
export const routerUrl = '/'; // /practice/

class Storage {
    constructor() {
        this.tmp = {};
        this.tmp.prevCheck = -1;
        this.typesHomeworkNames = {
            'lec': 'лекция',
            'sem': 'семинар',
            'rk': 'рубежный контроль',
            'ex': 'экзамен'
        };
    }

    init() {
        this.store = {};
        this.store.modules = [];
        this.store.lessons = [];
        this.store.homeworks = [];
        this.store.marks_lesson = [];
        this.store.marks_homework = [];
        this.tmp.prevCheck = null;
    }

    getModules() {
        return this.store.modules;
    }

    getLessons() {
        return this.store.lessons;
    }

    getLessonsByID(id) {
        return this.store.lessons[id];
    }

    getLessonByID(id_module, lesson_id) {
        return this.store.lessons[id_module][lesson_id];
    }

    getLessonsNums() {
        let data = [];
        for (let i = 0; i < this.store.modules.length; i++) {
            for (let j = 0; j < this.store.lessons[i].length; j++) {
                data.push({name: this.store.lessons[i][j].name, num: i + '_' + j});
            }
        }
        return data;
    }

    getModuleByID(id) {
        return this.store.modules[id];
    }

    createModule(name, max_points) {
        const module = {name: name, max_points: max_points};

        this.store.modules.push(module);
        this.store.lessons.push([]);
        this.store.marks_lesson.push([]);
        return module;
    }

    editModuleByID(id, name, max_points) {
        let module = this.getModuleByID(id);
        module.name = name;
        module.max_points = max_points;
    }

    deleteModuleByID(id) {
        this.store.modules.splice(id, 1);
        this.deleteModuleLessonsByID(id);
        //return this.store.modules[id];
    }

    createLesson(name, type, description, module) {
        const lesson = {name: name, type: type, description: description};

        this.store.lessons[module].push(lesson);
        this.store.marks_lesson[module].push([]);
        return lesson;
    }

    createMarkLesson(name, points, module_id, lesson_id) {
        const mark = {name: name, points: points};

        this.store.marks_lesson[module_id][lesson_id].push(mark);
        return mark;
    }

    createMarkHomework(name, points, homework_id) {
        const mark = {name: name, points: points};

        this.store.marks_homework[homework_id].push(mark);
        return mark;
    }

    editMarkLesson(name, points, module_id, lesson_id, num) {
        const mark = this.getMarkLessonByID(module_id, lesson_id, num);
        mark.name = name;
        mark.points = points;

        return mark;
    }

    editMarkHomework(name, points, homework_id, num) {
        const mark = this.getMarkHomeworkByID(homework_id, num);
        mark.name = name;
        mark.points = points;

        return mark;
    }

    editLessonByID(name, type, description, module_id, lesson_id) {
        let lesson = this.getLessonByID(module_id, lesson_id);
        lesson.name = name;
        lesson.type = type;
        lesson.description = description;
    }

    deleteModuleLessonsByID(module_id) {
        for (let i = this.getCountModuleLessons(module_id) - 1; i > -1; i--) {
            this.deleteLessonByID(i, module_id);
        }
        this.store.lessons.splice(module_id, 1);
        this.store.marks_lesson.splice(module_id, 1);
        this.upModuleHomework(module_id);
    }

    deleteLessonByID(lesson_id, module_id) {
        this.store.lessons[module_id].splice(lesson_id, 1);
        this.store.marks_lesson[module_id].splice(lesson_id, 1);

        const homeworks = this.getHomeworkByLessonID(lesson_id, module_id);
        //console.log(homeworks);
        for (let i = 0; i < homeworks.length; i++) {
            if (homeworks[i].start === homeworks[i].end) {
                this.deleteHomeworkByID(homeworks[i].num);
                i += 1;
            } else if (homeworks[i].start_hw && homeworks[i].end === '') {
                this.deleteHomeworkByID(homeworks[i].num);
                //this.getHomeworkByID(homeworks[i].num).start = '';
            } else if (homeworks[i].start === '') {
                this.deleteHomeworkByID(homeworks[i].num);
                //this.getHomeworkByID(homeworks[i].num).end = '';
            } else if (homeworks[i].start_hw) {
                this.getHomeworkByID(homeworks[i].num).start = '';
            } else {
                this.getHomeworkByID(homeworks[i].num).end = '';
            }
        }

        this.upLessonHomework(lesson_id, module_id);
    }

    upLessonHomework(lesson_id, module_id) {
        lesson_id = Number(lesson_id);
        module_id = Number(module_id);

        const homeworks = this.getHomeworks();
        for (let i = 0; i < homeworks.length; i++) {
            const hw_start_module = Number(homeworks[i].start.split('_')[0]);
            const hw_end_module = Number(homeworks[i].end.split('_')[0]);
            const hw_start_lesson = Number(homeworks[i].start.split('_')[1]);
            const hw_end_lesson = Number(homeworks[i].end.split('_')[1]);

            if (hw_start_module === module_id && hw_start_lesson > lesson_id) {
                homeworks[i].start = module_id + '_' + (hw_start_lesson - 1);
            }

            if (hw_end_module === module_id && hw_end_lesson > lesson_id) {
                homeworks[i].end = module_id + '_' + (hw_end_lesson - 1);
            }
        }
    }

    upModuleHomework(module_id) {
        module_id = Number(module_id);

        const homeworks = this.getHomeworks();
        for (let i = 0; i < homeworks.length; i++) {
            const hw_start_module = Number(homeworks[i].start.split('_')[0]);
            const hw_end_module = Number(homeworks[i].end.split('_')[0]);
            const hw_start_lesson = Number(homeworks[i].start.split('_')[1]);
            const hw_end_lesson = Number(homeworks[i].end.split('_')[1]);

            if (hw_start_module > module_id) {
                homeworks[i].start = (hw_start_module - 1) + '_' + hw_start_lesson;
            }

            if (hw_end_module > module_id) {
                homeworks[i].end = (hw_start_module - 1) + '_' + hw_end_lesson;
            }
        }
    }

    createHomework(name, desc, start, end, date) {
        const homework = {name: name, desc: desc, start: start, end: end, date: date};
        this.store.homeworks.push(homework);
        this.store.marks_homework.push([]);
        return homework;
    }

    editHomeworkByID(name, desc, start, end, date, homework_id) {
        this.store.homeworks[homework_id].name = name;
        this.store.homeworks[homework_id].desc = desc;
        this.store.homeworks[homework_id].start = start;
        this.store.homeworks[homework_id].end = end;
        this.store.homeworks[homework_id].date = date;
    }

    getHomeworks() {
        return this.store.homeworks;
    }

    getHomeworkByLessonID(lesson_id, module_id) {
        const find = module_id + '_' + lesson_id;
        let start = [];
        let end = [];

        for (const [i, element] of this.getHomeworks().entries()) {
            element.num = i;
            if (element.start === find) {
                start.push({
                    ...element,
                    start_hw: true
                });
            }
            if (element.end === find) {
                start.push({
                    ...element,
                    start_hw: false
                });
            }
        }
        return end.concat(start);
    }

    getHomeworkByID(id) {
        return this.store.homeworks[id];
    }

    getMarksHomework() {
        return this.store.marks_homework;
    }

    getMarksLesson() {
        return this.store.marks_lesson;
    }

    getMarksLessonsByID(module_id) {
        return this.store.marks_lesson[module_id];
    }

    getMarksLessonByID(module_id, lesson_id) {
        return this.store.marks_lesson[module_id][lesson_id];
    }

    getMarksHomeworkByID(homework_id) {
        return this.store.marks_homework[homework_id];
    }

    deleteMarkLesson(module_id, lesson_id, num) {
        return this.store.marks_lesson[module_id][lesson_id].splice(num, 1);
    }

    deleteMarkHomework(homework_id, num) {
        return this.store.marks_homework[homework_id].splice(num, 1);
    }

    getMarkLessonByID(module_id, lesson_id, num) {
        return this.store.marks_lesson[module_id][lesson_id][num];
    }

    getMarkHomeworkByID(homework_id, num) {
        return this.store.marks_homework[homework_id][num];
    }

    deleteHomeworkByID(id_homework) {
        this.store.homeworks.splice(id_homework, 1);
        this.store.marks_homework.splice(id_homework, 1);
    }

    swap(what, a, b) {
        [what[a], what[b]] =
            [what[b], what[a]];
    };

    swap_homeworks(module_id, lesson_id_1, lesson_id_2) {
        const hw_1 = module_id + '_' + lesson_id_1;
        const hw_2 = module_id + '_' + lesson_id_2;

        for (const element of this.getHomeworks()) {
            if (element.start === hw_2) {
                element.start = hw_1;
            } else if (element.start === hw_1) {
                element.start = hw_2;
            }

            if (element.end === hw_2) {
                element.end = hw_1;
            } else if (element.end === hw_1) {
                element.end = hw_2;
            }

            const hw_start_module = Number(element.start.split('_')[0]);
            const hw_end_module = Number(element.end.split('_')[0]);
            const hw_start_lesson = Number(element.start.split('_')[1]);
            const hw_end_lesson = Number(element.end.split('_')[1]);
            if (hw_start_module === hw_end_module && hw_start_lesson > hw_end_lesson) {
                [element.start, element.end] =
                    [element.end, element.start];
            }
        }
    }

    swap_module_homeworks(module_id_1, module_id_2) {
        module_id_1 = Number(module_id_1);
        module_id_2 = Number(module_id_2);

        const homeworks = this.getHomeworks();
        for (let i = 0; i < homeworks.length; i++) {
            const hw_start_module = Number(homeworks[i].start.split('_')[0]);
            const hw_end_module = Number(homeworks[i].end.split('_')[0]);
            const hw_start_lesson = Number(homeworks[i].start.split('_')[1]);
            const hw_end_lesson = Number(homeworks[i].end.split('_')[1]);

            if (hw_start_module === module_id_1) {
                homeworks[i].start = module_id_2 + '_' + hw_start_lesson;
            } else if (hw_start_module === module_id_2) {
                homeworks[i].start = module_id_1 + '_' + hw_start_lesson;
            }

            if (hw_end_module === module_id_1) {
                homeworks[i].end = module_id_2 + '_' + hw_end_lesson;
            } else if (hw_end_module === module_id_2) {
                homeworks[i].end = module_id_1 + '_' + hw_end_lesson;
            }

            if (hw_start_module > hw_end_module) {
                [homeworks[i].start, homeworks[i].end] =
                    [homeworks[i].end, homeworks[i].start];
            }
        }
    }

    moveUp(type, index, page = null) {
        switch (type) {
            case 'modules':
                this.swap(this.getModules(), index - 1, index);
                this.swap(this.getLessons(), index - 1, index);
                this.swap(this.getMarksLesson(), index - 1, index);
                this.swap_module_homeworks(index, index - 1);
                break;
            case 'lessons':
                this.swap(this.getLessonsByID(page.moduleID), index - 1, index);
                this.swap(this.getMarksLessonsByID(page.moduleID), index - 1, index);

                this.swap_homeworks(page.moduleID, index, index - 1);
                break;
            case 'lesson':
                this.swap(this.getMarksLessonByID(page.moduleID, page.lessonID), index - 1, index);
                break;
            case 'homework':
                this.swap(this.getMarksHomeworkByID(page.homeworkID), index - 1, index);
                break;
        }
    }

    moveDown(type, index, page = null) {
        switch (type) {
            case 'modules':
                this.swap(this.getModules(), index + 1, index);
                this.swap(this.getLessons(), index + 1, index);
                this.swap(this.getMarksLesson(), index + 1, index);
                this.swap_module_homeworks(index + 1, index);
                break;
            case 'lessons':
                this.swap(this.getLessonsByID(page.moduleID), index + 1, index);
                this.swap(this.getMarksLessonsByID(page.moduleID), index + 1, index);
                this.swap_homeworks(page.moduleID, index, index + 1);
                break;
            case 'lesson':
                this.swap(this.getMarksLessonByID(page.moduleID, page.lessonID), index + 1, index);
                break;
            case 'homework':
                this.swap(this.getMarksHomeworkByID(page.homeworkID), index + 1, index);
                break;
        }
    }

    generateSelection(type, search, page = null) {
        let selection = [];
        switch (type) {
            case 'modules':
                for (const [i, element] of this.getModules().entries()) {
                    element.num = i;
                    element.checked = false;
                    if (element.name.toLowerCase().includes(search)) {
                        selection.push(element);
                    }
                }
                break;
            case 'lessons':
                for (const [i, element] of this.getLessonsByID(page.moduleID).entries()) {
                    element.num = i;
                    element.checked = false;
                    if (element.name.toLowerCase().includes(search)) {
                        selection.push(element);
                    }
                }
                break;
            case 'lesson':
                for (const [i, element] of this.getMarksLessonByID(page.moduleID, page.lessonID).entries()) {
                    element.num = i;
                    element.checked = false;
                    if (element.name.toLowerCase().includes(search)) {
                        selection.push(element);
                    }
                }
                break;
            case 'homework':
                for (const [i, element] of this.getMarksHomeworkByID(page.homeworkID).entries()) {
                    element.num = i;
                    element.checked = false;
                    if (element.name.toLowerCase().includes(search)) {
                        selection.push(element);
                    }
                }
                break;
        }
        return selection
    }

    getCountModuleLessons(module_id) {
        return this.store.lessons[module_id].length;
    }

    getStore() {
        return this.store;
    }
}

export default new Storage();