import createStore from 'redux-zero';
import {initModals} from "../actions/modal";

const initialState = {
    searchText: '',
    tableData : { },
    editPanel : { },
    modal : {
        ...initModals()
    }
};
const store = createStore(initialState);

export default store;
