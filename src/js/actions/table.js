import Storage from "../utils/data";

export function initTableData(state, type, page = null) {
    Storage.tmp.prevCheck = -1;
    return {
        type: type,
        searchText: '',
        page : {
            ...state.page,
            ...page
        },
        tableData: {
            ...state.tableData,
            elements: Storage.generateSelection(type, '', page),
            allChecked: false
        },
        editPanel: {
            isOpen: null
        }
    };
}

export function clickCheckbox(state, e, indexCheck) {
    let start = null;
    let end = null;
    if (Storage.tmp.prevCheck != null && e.shiftKey) {
        if (Storage.tmp.prevCheck < indexCheck) {
            start = Storage.tmp.prevCheck;
            end = indexCheck;
        } else if (Storage.tmp.prevCheck > indexCheck) {
            start = indexCheck;
            end = Storage.tmp.prevCheck;
        }
    }

    let data = {
        tableData:
            {
                ...state.tableData,
                elements:
                    state.tableData.elements.map((item, index) => {
                        if (index === indexCheck || (index > start && index < end)) {
                            return {
                                ...item,
                                checked: state.tableData.elements[index].checked ^ true
                            }
                        }
                        return item;
                    }),
                allChecked: false
            },
        editPanel: {
            ...state.editPanel,
            isOpen: null,
            moveUpBool: null,
            moveDownBool: null,
            isEditBool: null
        }
    };
    checkControl(data);
    Storage.tmp.prevCheck = indexCheck;

    return data;
}

export function clickAllCheckbox(state) {
    if (state.tableData.elements.length === 0) {
        return null;
    }
    const allCheck = state.tableData.allChecked ^ true;
    let data = {
        tableData: {
            ...state.tableData,
            allChecked: allCheck,
            elements: state.tableData.elements.map((item) => {
                return {
                    ...item,
                    checked: allCheck
                }
            })
        },
        editPanel: {
            ...state.editPanel
        }
    };

    checkControl(data);
    return data;
}

export function checkControl(data) {
    const count = countChecked(data);
    if (count > 0) {
        data.tableData.allChecked = true;
        data.editPanel.isOpen = true;
        data.editPanel.moveUpBool = data.tableData.elements[0].checked;
        data.editPanel.moveDownBool = data.tableData.elements[data.tableData.elements.length - 1].checked;

        if (count > 1) {
            data.editPanel.isEditBool = true;
        }
    } else {
        data.editPanel.isOpen = null;
    }
    return data;
}

export function getChecked(data) {
    let checked = [];

    data.tableData.elements.map((item) => {
        if (item.checked) {
            checked.push(item.num);
        }
    });
    return checked;
}

export function countChecked(data) {
    let count = 0;
    data.tableData.elements.map((item) => {
        if (item.checked) {
            count++;
        }
    });
    return count;
}

