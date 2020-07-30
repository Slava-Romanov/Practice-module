import * as tableActions from './table';
import * as editPanelActions from './editPanel';
import * as topActions from './top';
import * as modalActions from './modal';

const actions = {
    searchUpdate: (state, e, type) => topActions.searchUpdate(state, e, type),

    deleteElementModal: (state, type) => modalActions.deleteElementModal(state, type),
    newModuleModal: (state, num) => modalActions.newModuleModal(state, num),
    closeModal: (state, modal) => modalActions.closeModal(state, modal),
    addModule: (state, e, num) => modalActions.addModule(state, num),
    onInputNewModuleModal: (state, e) => modalActions.onInputNewModuleModal(state, e),
    getKey: (state, e) => modalActions.getKey(state, e),

    deleteModulesModal: (state, e) => modalActions.deleteModulesModal(state, e),

    initTableData: (state, type) => tableActions.initTableData(state, type),
    clickCheckbox: (state, e, index) => tableActions.clickCheckbox(state, e, index),
    clickAllCheckbox: (state) => tableActions.clickAllCheckbox(state),

    removeSelection: (state) => editPanelActions.removeSelection(state),
    moveUp: (state, type) => editPanelActions.moveUp(state, type),
    moveDown: (state, type) => editPanelActions.moveDown(state, type),
    editCheck: (state, type) => editPanelActions.editCheck(state, type)
};

export default actions;