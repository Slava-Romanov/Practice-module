import {h, Component, render, Fragment} from 'preact';
import {route} from 'preact-router';
import {routerUrl} from "../utils/data";

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
            data.modal.choiceModal.add_text = [' Внимание! Вместе с удалением каждого модуля,',
                <br/>, 'удаляются связанные с ним занятия,', <br/>, 'домашние задания и оценки'];

            data.modal.choiceModal.onClickYes = 'deleteModulesModal';
            break;
        case 'lessons':
            data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранное занятие?';
            if (countChecked(state) > 1) {
                data.modal.choiceModal.text = 'Вы действительно хотите удалить выбранные занятия?';
            }
            data.modal.choiceModal.add_text = [' Внимание! Вместе с удалением каждого занятия,',
                <br/>, 'удаляются связанные с ним оценки,', <br/>, 'домашние задания и их оценки'];

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

    data.modal.choiceModal.text = ['Вы действительно хотите', <br/>, 'удалить занятие?'];
    data.modal.choiceModal.add_text = [' Внимание! Вместе с удалением занятия,',
        <br/>, 'удаляются связанные с ним оценки,', <br/>, 'домашние задания и их оценки'];
    data.modal.choiceModal.onClickYes = 'deleteOneLessonModal';

    return data;
}

export function deleteOneLessonModal(state) {
    Storage.deleteLessonByID(state.page.lessonID, state.page.moduleID);
    route(routerUrl + 'module/' + state.page.moduleID);
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

    data.modal.choiceModal.text = ['Вы действительно хотите', <br/>, 'удалить домашнее задание?'];
    data.modal.choiceModal.add_text = [' Внимание! Вместе с удалением дз,',
        <br/>, 'удаляются связанные с ним оценки'];
    data.modal.choiceModal.onClickYes = 'deleteOneHomeworkModal';

    return data;
}

export function deleteOneHomeworkModal(state) {
    const id = state.page.homeworkID;
    route(routerUrl + 'module/' + Storage.getHomeworkByID(id).start.split('_')[0]);
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
            modal: {
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
        const start = Storage.getHomeworkByID(num).start;
        const end = Storage.getHomeworkByID(num).end;

        data.modal.newHomeworkModal.nameModal = Storage.getHomeworkByID(num).name;
        data.modal.newHomeworkModal.startModal = Storage.getLessonByDoubleID(start).name;
        data.modal.newHomeworkModal.startModalNum = Storage.getHomeworkByID(num).start;
        data.modal.newHomeworkModal.endModal = Storage.getLessonByDoubleID(end).name;
        data.modal.newHomeworkModal.endModalNum = Storage.getHomeworkByID(num).end;
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
        selectOpen: null,
        modal: {
            ...state.modal,
            [modal]: {
                //...state.modal[modal],
                //isOpen: null
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
            nameModalErr: '',
            pointsModalErr: ''
        }
    };

    if (!name || name === '') {
        dataModal.newModuleModal.nameModalErr = 'Введите название модуля';
        valid = false;
    }

    if (!Number(points) || Number(points) <= 0) {
        dataModal.newModuleModal.pointsModalErr = 'Введенное значение должно быть положительным числом';
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
    const type = state.modal.newLessonModal.typeModalNum;
    const desc = state.modal.newLessonModal.descModal;
    let valid = true;

    let dataModal = {
        ...state.modal,
        newLessonModal: {
            ...state.modal.newLessonModal,
            nameModalErr: '',
            typeModalErr: ''
        }
    };

    if (!name || name === '') {
        dataModal.newLessonModal.nameModalErr = 'Введите название занятия';
        valid = false;
    }

    if (!type) {
        dataModal.newLessonModal.typeModalErr = 'Выберите тип занятия';
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
    const start = state.modal.newHomeworkModal.startModalNum;
    const end = state.modal.newHomeworkModal.endModalNum;
    const date = state.modal.newHomeworkModal.dateModal;
    const desc = state.modal.newHomeworkModal.descModal;
    let valid = true;

    let dataModal = {
        ...state.modal,
        newHomeworkModal: {
            ...state.modal.newHomeworkModal,
            nameModalErr: '',
            startModalErr: '',
            endModalErr: '',
            textErrDate: '',
        }
    };

    if (!name || name === '') {
        dataModal.newHomeworkModal.nameModalErr = 'Введите название домашнего задания';
        valid = false;
    }

    if (!start) {
        dataModal.newHomeworkModal.startModalErr = 'Выберите занятие выдачи';
        valid = false;
    }

    if (!end) {
        dataModal.newHomeworkModal.endModalErr = 'Выберите занятие сдачи';
        valid = false;
    }

    if (start && end) {
        const hw_start_module = Number(start.split('_')[0]);
        const hw_end_module = Number(end.split('_')[0]);
        const hw_start_lesson = Number(start.split('_')[1]);
        const hw_end_lesson = Number(end.split('_')[1]);

        if (hw_start_module > hw_end_module ||
            (hw_start_module === hw_end_module && hw_start_lesson > hw_end_lesson)) {
            dataModal.newHomeworkModal.startModalErr = 'Занятие сдачи выше задания выдачи';
            dataModal.newHomeworkModal.endModalErr = 'Занятие выдачи меньше задания сдачи';
            valid = false;
        }
    }

    if (!date || date === '') {
        dataModal.newHomeworkModal.dateModalErr = 'Выберите крайний срок сдачи';
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
            nameModalErr: '',
            pointsModalErr: ''
        }
    };

    if (!name || name === '') {
        dataModal.newMarkModal.nameModalErr = 'Добавьте комментарий';
        valid = false;
    }

    if (isNaN(Number(points)) || Number(points) < 0 || points === '') {
        dataModal.newMarkModal.pointsModalErr = 'Введенное значение должно быть положительным числом, либо нулем';
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
    const value = e.currentTarget.value;
    let data = {};

    if (e.currentTarget.id === 'nameModal') {
        if (!value || value === '') {
            //document.getElementById(e.currentTarget.id).classList.add("errorLine");
            data.nameModalErr = 'Введите название модуля';
        } else {
            //document.getElementById(e.currentTarget.id).classList.remove("errorLine");
            data.nameModalErr = '';
        }
    } else if (e.currentTarget.id === 'pointsModal') {
        if (!Number(value) || Number(value) <= 0) {
            data.pointsModalErr = 'Введенное значение должно быть положительным числом';
        } else {
            data.pointsModalErr = '';
        }
    }

    return {
        modal: {
            ...state.modal,
            newModuleModal: {
                ...state.modal.newModuleModal,
                ...data,
                [e.currentTarget.id]: e.currentTarget.value
            },
        }
    }
}

export function onInputNewLessonModal(state, e) {
    const value = e.currentTarget.value;
    let data = {};

    if (e.currentTarget.id === 'nameModal') {
        if (!value || value === '') {
            //document.getElementById(e.currentTarget.id).classList.add("errorLine");
            data.nameModalErr = 'Введите название занятия';
        } else {
            //document.getElementById(e.currentTarget.id).classList.remove("errorLine");
            data.nameModalErr = '';
        }
    }

    return {
        modal: {
            ...state.modal,
            newLessonModal: {
                ...state.modal.newLessonModal,
                ...data,
                [e.currentTarget.id]: value
            },
        }
    }
}

export function onInputNewHomeworkModal(state, e) {
    const value = e.currentTarget.value;
    let data = {};

    if (e.currentTarget.id === 'nameModal') {
        if (!value || value === '') {
            //document.getElementById(e.currentTarget.id).classList.add("errorLine");
            data.nameModalErr = 'Введите название домашнего задания';
        } else {
            //document.getElementById(e.currentTarget.id).classList.remove("errorLine");
            data.nameModalErr = '';
        }
    } else if (e.currentTarget.id === 'dateModal') {
        if (!value || value === '') {
            //document.getElementById(e.currentTarget.id).classList.add("errorLine");
            data.dateModalErr = 'Выберите крайний срок сдачи';
        } else {
            //document.getElementById(e.currentTarget.id).classList.remove("errorLine");
            data.dateModalErr = '';
        }
    }

    return {
        modal: {
            ...state.modal,
            newHomeworkModal: {
                ...state.modal.newHomeworkModal,
                ...data,
                [e.currentTarget.id]: value
            },
        }
    }
}

export function onInputNewMarkModal(state, e) {
    const value = e.currentTarget.value;
    let data = {};

    if (e.currentTarget.id === 'nameModal') {
        if (!value || value === '') {
            data.nameModalErr = 'Добавьте комментарий';
        } else {
            data.nameModalErr = '';
        }
    } else if (e.currentTarget.id === 'pointsModal') {
        if (isNaN(Number(value)) || Number(value) < 0 || value === '') {
            data.pointsModalErr = 'Введенное значение должно быть положительным числом, либо нулем';
        } else {
            data.pointsModalErr = '';
        }
    }

    return {
        modal: {
            ...state.modal,
            newMarkModal: {
                ...state.modal.newMarkModal,
                ...data,
                [e.currentTarget.id]: e.currentTarget.value
            },
        }
    }
}

export function onInputSelectModal(state, e, modalID) {
    //document.getElementById(e.currentTarget.id).classList.add("selectedLine");
    //const click = clickOutNewHomeworkModal(state, e);
    let data = {
        selectOpen: e.currentTarget.id + 'Select',
        modal: {
            ...state.modal,
            [modalID]: {
                ...state.modal[modalID],
                [e.currentTarget.id]: e.currentTarget.value,
                //...click.modal[modalID],

                // [e.currentTarget.id + 'Select']: {
                //     isOpen: true
                // }
            },
        }
    };

    if (e.type !== 'focusin') {
        data.modal[modalID][e.currentTarget.id + 'Num'] = undefined;
    }

    return data;
}

export function clickOutNewHomeworkModal(state, e) {
    //console.log('click out', state.selectOpen);
    const modalID = 'newHomeworkModal';
    let data = { };

    if (state.selectOpen === 'endModalSelect' && !document.getElementById('endModalLine').contains(e.target)) {
        let inputID = 'endModal';
        if (!state.modal[modalID][inputID + 'Num']) {
            //document.getElementById(inputID).classList.add("errorLine");
            data = {
                [modalID]: {
                    ...state.modal[modalID],
                    [inputID + 'Err'] : 'Выберите занятие сдачи'
                },
            };
        }
        // else {
        //     //document.getElementById(inputID).classList.remove("errorLine");
        // }
    } else if (state.selectOpen === 'startModalSelect' && !document.getElementById('startModalLine').contains(e.target)) {
        let inputID = 'startModal';
        if (!state.modal[modalID][inputID + 'Num']) {
            //document.getElementById(inputID).classList.add("errorLine");
            data = {
                [modalID]: {
                    ...state.modal[modalID],
                    [inputID + 'Err']: 'Выберите занятие выдачи'
                },
            };
        }

        // } else {
        //     console.log('delete start');
        //     //document.getElementById(inputID).classList.remove("errorLine");
        // }
    }
    //console.log(state.modal[modalID]['startModalNum']);
    let open = null;
    if (document.getElementById('startModalLine').contains(e.target)) {
            open = 'startModalSelect';
            //console.log(1);
    } else if (document.getElementById('endModalLine').contains(e.target)) {
            open = 'endModalSelect';
            //console.log(2);
    }

    // if (state.selectOpenWas != null && state.selectOpenWas !== open) {
    //     document.getElementById(state.selectOpenWas.substr(0, state.selectOpenWas.length - 6)).classList.remove("selectedLine");
    // }
    //selectOpen: e.currentTarget.id + 'Select',
    //console.log(open);

    return {
        selectOpen: open,
        //selectOpenWas: open,
        modal: {
            ...state.modal,
            ...data
        }
    };
}

export function clickOutNewLessonModal(state, e) {
    const modalID = 'newLessonModal';
    let data = { };

    if (state.selectOpen === 'typeModalSelect' && !document.getElementById('typeModalLine').contains(e.target)) {
        let inputID = 'typeModal';
        if (!state.modal[modalID][inputID + 'Num']) {
            data = {
                [modalID]: {
                    ...state.modal[modalID],
                    [inputID + 'Err'] : 'Выберите тип занятия'
                },
            };
        }
    }

    let open = null;
    if (document.getElementById('typeModalLine').contains(e.target)) {
        open = 'typeModalSelect';
    }

    return {
        selectOpen: open,
        modal: {
            ...state.modal,
            ...data
        }
    };
}

export function chooseSelect(state, modalID, inputID, numData, textData) {
    //document.getElementById(inputID).classList.remove("selectedLine");
    //document.getElementById(inputID).classList.remove("errorLine");

    const data = {
        selectOpen: null,
        modal: {
            ...state.modal,
            [modalID]: {
                ...state.modal[modalID],
                [inputID]: textData,//Storage.getLessonByDoubleID(numData).name,
                [inputID + 'Num']: numData,
                [inputID + 'Err'] : ''
            },
        }
    };

    if (modalID === 'newHomeworkModal') {
        const start = data.modal.newHomeworkModal.startModalNum;
        const end = data.modal.newHomeworkModal.endModalNum;

        if (start && end) {
            const hw_start_module = Number(start.split('_')[0]);
            const hw_end_module = Number(end.split('_')[0]);
            const hw_start_lesson = Number(start.split('_')[1]);
            const hw_end_lesson = Number(end.split('_')[1]);

            if (hw_start_module > hw_end_module ||
                (hw_start_module === hw_end_module && hw_start_lesson > hw_end_lesson)) {
                data.modal.newHomeworkModal.startModalErr = 'Занятие сдачи выше задания выдачи';
                data.modal.newHomeworkModal.endModalErr = 'Занятие выдачи меньше задания сдачи';
            } else {
                data.modal.newHomeworkModal.startModalErr = '';
                data.modal.newHomeworkModal.endModalErr = '';
            }
        }
    }

    return {
        ...data
    }
}

export function initModals() {
    return {
        newModuleModal: {},
        newLessonModal: {},
        newHomeworkModal: {},
        newMarkModal: {},
        infoModal: {},
        choiceModal: {}
    }
}