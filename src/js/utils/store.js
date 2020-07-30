import createStore from 'redux-zero';

const initialState = {
    searchText: '',
    tableData : { },
    editPanel : { },
    modal : {
        newModuleModal : {},
        infoModal : {},
        choiceModal : {}
    }
};
const store = createStore(initialState);

export default store;
