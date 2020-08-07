import createStore from 'redux-zero';
import {initModals} from "../actions/modal";

const initialState = {
    type : '',
    searchText : '',
    page : { },
    tableData : { },
    editPanel : { },
    modal : {
        ...initModals()
    }
};
const store = createStore(initialState);

export default store;
