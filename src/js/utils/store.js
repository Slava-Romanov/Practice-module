class Storage {
    constructor() {
        this.tmp = {};
        this.tmp.prevCheck = null;
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

    getModuleByID(id) {
        return this.store.modules[id];
    }

    createModule(name, max_points) {
        const module = { name : name, max_points : max_points };

        this.store.modules.push(module);
        this.store.lessons.push([]);
        return this.store.modules;
    }

    editModuleByID(id, name, max_points) {
        console.log(id);
        let module = this.getModuleByID(id);
        module.name = name;
        module.max_points = max_points;
    }

    createLesson(name, type, description, module) {
        const lesson = { name : name, type : type, description : description };

        this.store.lessons[module].push(module);
        return this.store.lessons;
    }

    deleteModuleByID(id) {
        this.store.modules.splice(id, 1);
        this.deleteModuleLessonsByID(id);
        //рекурсия!
        //return this.store.modules[id];
    }

    deleteModuleLessonsByID(id_module) {
        this.store.lessons.splice(id_module, 1);
    }

    deleteLessonByID(id_lesson, id_module) {
        this.store.lessons[id_module].splice(id, 1);
    }

    swap(what, a, b) {
        [what[a], what[b]] =
            [what[b], what[a]];
    };

    moveUp(type, index) {
        switch (type) {
            case 'modules':
                this.swap(this.getModules(), index-1, index);
                this.swap(this.getLessons(), index-1, index);
                break;
            case 'lessons':
                break;
            case 'homeworks':
                break;
        }
    }

    moveDown(type, index) {
        switch (type) {
            case 'modules':
                this.swap(this.getModules(), index+1, index);
                this.swap(this.getLessons(), index+1, index);
                break;
            case 'lessons':
                break;
            case 'homeworks':
                break;
        }
    }

    generateSelection(type, search) {
        let selection = [];
        switch (type) {
            case 'modules':
                for (const [i, element] of this.getModules().entries()) {
                    element.num = i;
                    if (element.name.toLowerCase().includes(search)) {
                        selection.push(element);
                    }
                }
                break;
            case 'lessons':
                break;
            case 'homeworks':
                break;
        }

        return selection
    }

    getCountModuleLessons(module_id) {
        return this.store.lessons[module_id].length;
    }
}

export default new Storage();