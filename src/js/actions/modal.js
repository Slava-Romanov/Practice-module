import {h, Component, render, Fragment} from 'preact';
import { route } from 'preact-router';

import Storage from "../utils/data";
import {countChecked, getChecked} from "./table";

export function deleteElementModal(state, type) {
    let data = {
        modal: {
            ...state.modal,
            choiceModal: {
                isOpen: true
            }
        },
    };

    switch (type) {
        case 'modules':
            data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранный модуль?';
            if (countChecked(state) > 1) {
                data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранные модули?';
            }
            data.modal.choiceModal.add_text = [ ' Внимание! Вместе с удалением каждого модуля,',
                <br />, 'удаляются связанные с ним занятия,', <br />, 'домашние задания и оценки'];

            data.modal.choiceModal.onClickYes = 'deleteModulesModal';
            break;
        case 'lessons':
            data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранное занятие?';
            if (countChecked(state) > 1) {
                data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранные занятия?';
            }
            data.modal.choiceModal.add_text = [ ' Внимание! Вместе с удалением каждого занятия,',
                <br />, 'удаляются связанные с ним оценки,', <br />, 'домашние задания и их оценки'];

            data.modal.choiceModal.onClickYes = 'deleteLessonsModal';
            break;
        case 'lesson':
            data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранную оценку?';
            if (countChecked(state) > 1) {
                data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранные оценки?';
            }

            data.modal.choiceModal.onClickYes = 'deleteMarksModal';
            break;
        case 'homework':
            data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранную оценку?';
            if (countChecked(state) > 1) {
                data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранные оценки?';
            }

            data.modal.choiceModal.onClickYes = 'deleteMarksModal';
            break;
    }

    return data;
}

export function deleteOneLesson(state) {
    let data = {
        modal: {
            ...state.modal,
            choiceModal: {
                isOpen: true
            }
        },
    };

    data.modal.choiceModal.text = ['Вы действительно хотите', <br />, 'удалить занятие?'];
    data.modal.choiceModal.add_text = [ ' Внимание! Вместе с удалением занятия,',
        <br/>, 'удаляются связанные с ним оценки,', <br />, 'домашние задания и их оценки'];
    data.modal.choiceModal.onClickYes = 'deleteOneLessonModal';

    return data;
}

export function deleteOneLessonModal(state) {
    Storage.deleteLessonByID(state.page.lessonID, state.page.moduleID);
    route('/module/' + state.page.moduleID);
    return {
        modal: {
            ...state.modal,
            ...createInfoModal('Удаление уcпешно произведено'),
            choiceModal: {
                isOpen: null
            }
        }
    };
}

export function deleteOneHomework(state) {
    let data = {
        modal: {
            ...state.modal,
            choiceModal: {
                isOpen: true
            }
        },
    };

    data.modal.choiceModal.text = ['Вы действительно хотите', <br />, 'удалить домашнее задание?'];
    data.modal.choiceModal.add_text = [ ' Внимание! Вместе с удалением дз,',
        <br/>, 'удаляются связанные с ним оценки'];
    data.modal.choiceModal.onClickYes = 'deleteOneHomeworkModal';

    return data;
}

export function deleteOneHomeworkModal(state) {
    const id = state.page.homeworkID;
    route('/module/' + Storage.getHomeworkByID(id).start.split('_')[0]);
    Storage.deleteHomeworkByID(id);
    return {
        modal: {
            ...state.modal,
            ...createInfoModal('Удаление уcпешно произведено'),
            choiceModal: {
                isOpen: null
            }
        }
    };
}



export function getKey(state, e) {
    let data = {};
    if (e.code === 'Escape') {
        Storage.tmp.prevCheck = -1;
        data = {
            tableData: {
                ...state.tableData,
                allChecked: false,
                elements:
                    state.tableData.elements.map((item) => {
                            return {
                                ...item,
                                checked: false
                            }
                    }),
            },
            modal : {
                ...initModals()
            },
            editPanel: {
                isOpen: null
            }
        };
    }
    return data;
}

export function deleteModulesModal(state, e) {
    const checked = getChecked(state).reverse();
    for (const value of checked) {
        Storage.deleteModuleByID(value);
    }

    return {
        tableData: {
            ...state.tableData,
            elements: Storage.generateSelection('modules', state.searchText),
            allChecked: false
        },
        modal: {
            ...state.modal,
            ...createInfoModal('Удаление уcпешно произведено'),
            choiceModal: {
                isOpen: null
            }
        },
        editPanel: {
            isOpen: null
        }
    };
}

export function deleteLessonsModal(state, e) {
    const checked = getChecked(state).reverse();
    for (const value of checked) {
        Storage.deleteLessonByID(value, state.page.moduleID);
    }

    return {
        tableData: {
            ...state.tableData,
            elements: Storage.generateSelection('lessons', state.searchText, state.page),
            allChecked: false
        },
        modal: {
            ...state.modal,
            ...createInfoModal('Удаление уcпешно произведено'),
            choiceModal: {
                isOpen: null
            }
        },
        editPanel: {
            isOpen: null
        }
    };
}

export function deleteMarksModal(state, e) {
    const checked = getChecked(state).reverse();
    for (const value of checked) {
        if (state.type === 'lesson') {
            Storage.deleteMarkLesson(state.page.moduleID, state.page.lessonID, value)
        } else {
            Storage.deleteMarkHomework(state.page.homeworkID, value)
        }
    }

    return {
        tableData: {
            ...state.tableData,
            elements: Storage.generateSelection(state.type, state.searchText, state.page),
            allChecked: false
        },
        modal: {
            ...state.modal,
            ...createInfoModal('Удаление уcпешно произведено'),
            choiceModal: {
                isOpen: null
            }
        },
        editPanel: {
            isOpen: null
        }
    };
}

export function newModuleModal(state, num = null) {
    let data = {
        modal: {
            ...state.modal,
            newModuleModal: {
                isOpen: true,
                num: num
            },
        }
    };

    if (num != null) {
        data.modal.newModuleModal.nameModal = Storage.getModuleByID(num).name;
        data.modal.newModuleModal.pointsModal = Storage.getModuleByID(num).max_points
    }

    return data;
}

export function newLessonModal(state, num = null) {
    let data = {
        modal: {
            ...state.modal,
            newLessonModal: {
                isOpen: true,
                num: num
            },
        }
    };

    if (num != null) {
        data.modal.newLessonModal.nameModal = Storage.getLessonByID(state.page.moduleID, num).name;
        data.modal.newLessonModal.typeModal = Storage.getLessonByID(state.page.moduleID, num).type;
        data.modal.newLessonModal.descModal = Storage.getLessonByID(state.page.moduleID, num).description;
    }

    return data;
}

export function newHomeworkModal(state, num = null) {
    let data = {
        modal: {
            ...state.modal,
            newHomeworkModal: {
                isOpen: true,
                num: num
            },
        }
    };

    if (num != null) {
        data.modal.newHomeworkModal.nameModal = Storage.getHomeworkByID(num).name;
        data.modal.newHomeworkModal.startModal = Storage.getHomeworkByID(num).start;
        data.modal.newHomeworkModal.endModal = Storage.getHomeworkByID(num).end;
        data.modal.newHomeworkModal.dateModal = Storage.getHomeworkByID(num).date;
        data.modal.newHomeworkModal.descModal = Storage.getHomeworkByID(num).desc;
    }

    return data;
}

export function newMarkModal(state, num = null) {
    let data = {
        modal: {
            ...state.modal,
            newMarkModal: {
                isOpen: true,
                num: num
            },
        }
    };

    if (num != null) {
        if (!state.page.homeworkID) {
            const mark = Storage.getMarkLessonByID(state.page.moduleID, state.page.lessonID, num);
            data.modal.newMarkModal.nameModal = mark.name;
            data.modal.newMarkModal.pointsModal = mark.points
        } else {
            const mark = Storage.getMarkHomeworkByID(state.page.homeworkID, num);
            data.modal.newMarkModal.nameModal = mark.name;
            data.modal.newMarkModal.pointsModal = mark.points
        }
    }
    return data;
}

export function closeModal(state, modal) {
    return {
        modal: {
            ...state.modal,
            [modal]: {
                ...state.modal[modal],
                isOpen: null
            },
        }
    }
}

export function addModule(state, num = null) {
    const name = state.modal.newModuleModal.nameModal;
    const points = state.modal.newModuleModal.pointsModal;
    let valid = true;

    let dataModal = {
        ...state.modal,
        newModuleModal: {
            ...state.modal.newModuleModal,
            textErrName: '',
            textErrPoints: ''
        }
    };

    if (!name || name === '') {
        dataModal.newModuleModal.textErrName = 'Введите название модуля';
        valid = false;
    }

    if (!Number(points) || Number(points) <= 0) {
        dataModal.newModuleModal.textErrPoints = 'Введенное значение должно быть положительным числом';
        valid = false;
    }

    if (!valid) {
        return {
            modal: {
                ...dataModal
            }
        };
    } else {
        if (num === null) {
            Storage.createModule(name, points);
        } else {
            Storage.editModuleByID(num, name, points);
        }

        return {
            tableData: {
                ...state.tableData,
                elements: Storage.generateSelection('modules', state.searchText),
                allChecked: false
            },
            modal: {
                ...dataModal,
                ...(num === null ? createInfoModal('Модуль успешно создан') : createInfoModal('Модуль успешно изменен')),
                newModuleModal: {
                    isOpen: null
                }
            },
            editPanel: {
                isOpen: null
            }
        };
    }
}

export function addLesson(state, num = null) {
    const name = state.modal.newLessonModal.nameModal;
    const type = state.modal.newLessonModal.typeModal;
    const desc = state.modal.newLessonModal.descModal;
    let valid = true;

    let dataModal = {
        ...state.modal,
        newLessonModal: {
            ...state.modal.newLessonModal,
            textErrName: '',
            textErrType: ''
        }
    };

    if (!name || name === '') {
        dataModal.newLessonModal.textErrName = 'Введите название занятия';
        valid = false;
    }

    if (!type) {
        dataModal.newLessonModal.textErrType = 'Выберите тип занятия';
        valid = false;
    }

    if (!valid) {
        return {
            modal: {
                ...dataModal
            }
        };
    } else {
        if (num === null) {
            Storage.createLesson(name, type, desc, state.page.moduleID);
        } else {
            Storage.editLessonByID(name, type, desc, state.page.moduleID, num);
        }

        return {
            tableData: {
                ...state.tableData,
                elements: Storage.generateSelection('lessons', state.searchText, state.page),
                allChecked: false
            },
            modal: {
                ...dataModal,
                ...(num === null ? createInfoModal('Занятие успешно создано') : createInfoModal('Занятие успешно изменено')),
                newLessonModal: {
                    isOpen: null
                }
            },
            editPanel: {
                isOpen: null
            }
        };
    }
}

export function addHomework(state, num = null) {
    const name = state.modal.newHomeworkModal.nameModal;
    const start = state.modal.newHomeworkModal.startModal;
    const end = state.modal.newHomeworkModal.endModal;
    const date = state.modal.newHomeworkModal.dateModal;
    const desc = state.modal.newHomeworkModal.descModal;
    let valid = true;

    let dataModal = {
        ...state.modal,
        newHomeworkModal: {
            ...state.modal.newHomeworkModal,
            textErrName: '',
            textErrStart: '',
            textErrEnd: '',
            textErrDate: ''
        }
    };

    if (!name || name === '') {
        dataModal.newHomeworkModal.textErrName = 'Введите название занятия';
        valid = false;
    }

    if (!start) {
        dataModal.newHomeworkModal.textErrStart = 'Выберите занятие сдачи';
        valid = false;
    }

    if (!end) {
        dataModal.newHomeworkModal.textErrEnd = 'Выберите занятие выдачи';
        valid = false;
    }

    if (start && end) {
        const hw_start_module = Number(start.split('_')[0]);
        const hw_end_module = Number(end.split('_')[0]);
        const hw_start_lesson = Number(start.split('_')[1]);
        const hw_end_lesson = Number(end.split('_')[1]);

        if (hw_start_module > hw_end_module ||
            (hw_start_module === hw_end_module && hw_start_lesson > hw_end_lesson)) {
            dataModal.newHomeworkModal.textErrStart = 'Занятие сдачи выше задания выдачи';
            dataModal.newHomeworkModal.textErrEnd = 'Занятие выдачи меньше задания сдачи';
            valid = false;
        }
    }

    if (!date || date === '') {
        dataModal.newHomeworkModal.textErrDate = 'Выберите крайний срок сдачи';
        valid = false;
    }

    if (!valid) {
        return {
            modal: {
                ...dataModal
            }
        };
    } else {
        if (num === null) {
            Storage.createHomework(name, desc, start, end, date);
        } else {
            Storage.editHomeworkByID(name, desc, start, end, date, num);
        }

        // tableData: {
        // ...state.tableData,
        //         elements: Storage.generateSelection('lessons', state.searchText, state.page),
        //         allChecked: false
        // },

        return {
            modal: {
                ...dataModal,
                ...(num === null ? createInfoModal('Домашнее задание успешно создано') : createInfoModal('Домашнее задание успешно изменено')),
                newHomeworkModal: {
                    isOpen: null
                }
            },
            editPanel: {
                isOpen: null
            }
        };
    }
}

export function addMark(state, num = null) {
    const name = state.modal.newMarkModal.nameModal;
    const points = state.modal.newMarkModal.pointsModal;
    let valid = true;

    let dataModal = {
        ...state.modal,
        newMarkModal: {
            ...state.modal.newMarkModal,
            textErrName: '',
            textErrPoints: ''
        }
    };

    if (!name || name === '') {
        dataModal.newMarkModal.textErrName = 'Добавьте комментарий';
        valid = false;
    }

    if (isNaN(Number(points)) || Number(points) < 0) {
        dataModal.newMarkModal.textErrPoints = 'Введенное значение должно быть положительным числом, либо нулем';
        valid = false;
    }

    if (!valid) {
        return {
            modal: {
                ...dataModal
            }
        };
    } else {
        if (num === null) {
            if (!state.page.homeworkID) {
                Storage.createMarkLesson(name, points, state.page.moduleID, state.page.lessonID);
            } else {
                Storage.createMarkHomework(name, points, state.page.homeworkID);
            }
        } else {
            if (!state.page.homeworkID) {
                Storage.editMarkLesson(name, points, state.page.moduleID, state.page.lessonID, num);
            } else {
                Storage.editMarkHomework(name, points, state.page.homeworkID, num);
            }
        }

        return {
            tableData: {
                ...state.tableData,
                elements: Storage.generateSelection(state.type, state.searchText, state.page),
                allChecked: false
            },
            modal: {
                ...dataModal,
                ...(num === null ? createInfoModal('Оценка успешно добавлена') : createInfoModal('Оценка успешно изменена')),
                newMarkModal: {
                    isOpen: null
                }
            },
            editPanel: {
                isOpen: null
            }
        };
    }
}

function createInfoModal(text) {
    return {
        infoModal: {
            info: text,
            isOpen: true
        }
    }
}

export function onInputNewModuleModal(state, e) {
    return {
        modal: {
            ...state.modal,
            newModuleModal: {
                ...state.modal.newModuleModal,
                [e.currentTarget.id]: e.currentTarget.value
            },
        }
    }
}

export function onInputNewLessonModal(state, e) {
    return {
        modal: {
            ...state.modal,
            newLessonModal: {
                ...state.modal.newLessonModal,
                [e.currentTarget.id]: e.currentTarget.value
            },
        }
    }
}

export function onInputNewHomeworkModal(state, e) {
    return {
        modal: {
            ...state.modal,
            newHomeworkModal: {
                ...state.modal.newHomeworkModal,
                [e.currentTarget.id]: e.currentTarget.value
            },
        }
    }
}

export function onInputNewMarkModal(state, e) {
    return {
        modal: {
            ...state.modal,
            newMarkModal: {
                ...state.modal.newMarkModal,
                [e.currentTarget.id]: e.currentTarget.value
            },
        }
    }
}

export function initModals() {
    return {
        newModuleModal : {},
        newLessonModal : {},
        newHomeworkModal : {},
        newMarkModal : {},
        infoModal : {},
        choiceModal : {}
    }
}