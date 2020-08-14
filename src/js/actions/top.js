import Storage from "../utils/data";
import { route } from 'preact-router';

export function searchUpdate(state, e, type) {
    const search = e.currentTarget.value.toLowerCase();
    return {
        tableData : {
            ...state.tableData,
            elements: Storage.generateSelection(type, search, state.page),
            allChecked: false
        },
        searchText: search,
        editPanel : {
            ...state.editPanel,
            isOpen: null
        }
    }
}

// export function clickLink(state, e) {
//     e.preventDefault();
//     route(e.currentTarget.pathname);
// }