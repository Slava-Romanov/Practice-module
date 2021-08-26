import Storage from "../utils/data";
import {checkControl, getChecked} from "./table";
import {newModuleModal, newLessonModal, newMarkModal} from "./modal";

export function removeSelection(state) {
    return {
        tableData: {
            ...state.tableData,
            allChecked: false,
            elements: state.tableData.elements.map((item) => {
                return {
                    ...item,
                    checked: false
                }
            })
        },
        editPanel: {
            isOpen: null
        },
    }
}

export function moveUp(state, type) {
    const checked = getChecked(state);
    for (const value of checked) {
        Storage.moveUp(type, value, state.page);
    }
    let data = {
        tableData: {
            ...state.tableData,
            elements: Storage.generateSelection(type, state.searchText, state.page)
        },
        editPanel: {
            ...state.editPanel
        }
    };

    let indexArr = 0;
    data.tableData.elements.map((item) => {
        if (item.num === checked[indexArr] - 1) {
            item.checked = true;
            indexArr++;
        }
    });

    checkControl(data);
    return data;
}

export function moveDown(state, type) {
    const checked = getChecked(state).reverse();
    for (const value of checked) {
        Storage.moveDown(type, value, state.page);
    }

    let data = {
        tableData: {
            ...state.tableData,
            elements: Storage.generateSelection(type, state.searchText, state.page)
        },
        editPanel: {
            ...state.editPanel
        }
    };

    checked.reverse();
    let indexArr = 0;
    data.tableData.elements.map((item) => {
        if (item.num === checked[indexArr] + 1) {
            item.checked = true;
            indexArr++;
        }
    });

    checkControl(data);
    return data;
}

export function editCheck(state) {
    const num = getChecked(state)[0];
    switch (state.type) {
        case 'modules':
            return newModuleModal(state, num);
        case 'lessons':
            return newLessonModal(state, num);
        case 'lesson':
            return newMarkModal(state, num);
        case 'homework':
            return newMarkModal(state, num);
    }
    return newModuleModal(state, num)
}