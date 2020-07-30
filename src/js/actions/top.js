import Storage from "../utils/data";

export function searchUpdate(state, e, type) {
    return {
        tableData : {
            ...state.tableData,
            elements: Storage.generateSelection(type, e.currentTarget.value),
            allChecked: false
        },
        searchText: e.currentTarget.value,
        editPanel : {
            ...state.editPanel,
            isOpen: null
        }
    }
}