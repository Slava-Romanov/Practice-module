import {h, Component, render, Fragment} from 'preact';

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
            break;
        case 'homeworks':
            break;
    }

    return data;
}

export function getKey(state, e) {
    let data = {};
    if (e.code === 'Escape') {
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
            modal : { // объединить с инициалзиацией модалов
                newModuleModal : {},
                infoModal : {},
                choiceModal : {}
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