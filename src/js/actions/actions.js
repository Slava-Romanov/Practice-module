import * as tableActions from './table';
import * as editPanelActions from './editPanel';
import * as topActions from './top';
import * as modalActions from './modal';
import * as error from './error'

const actions = {
    searchUpdate: (state, e, type) => topActions.searchUpdate(state, e, type),
    //clickLink: (state, e) => topActions.clickLink(state, e),
    initError: (state) => error.initError(state),

    deleteElementModal: (state, type) => modalActions.deleteElementModal(state, type),
    newModuleModal: (state, num) => modalActions.newModuleModal(state, num),
    newLessonModal: (state, num) => modalActions.newLessonModal(state, num),
    newHomeworkModal: (state, num) => modalActions.newHomeworkModal(state, num),
    newMarkModal: (state, num) => modalActions.newMarkModal(state, num),

    closeModal: (state, modal) => modalActions.closeModal(state, modal),
    addModule: (state, e, num) => modalActions.addModule(state, num),
    addLesson: (state, e, num) => modalActions.addLesson(state, num),
    addHomework: (state, e, num) => modalActions.addHomework(state, num),
    addMark: (state, e, num) => modalActions.addMark(state, num),
    onInputNewModuleModal: (state, e) => modalActions.onInputNewModuleModal(state, e),
    onInputNewLessonModal: (state, e) => modalActions.onInputNewLessonModal(state, e),
    onInputNewHomeworkModal: (state, e) => modalActions.onInputNewHomeworkModal(state, e),
    onInputNewMarkModal: (state, e) => modalActions.onInputNewMarkModal(state, e),
    onInputSelectModal: (state, e, modalID) => modalActions.onInputSelectModal(state, e, modalID),
    getKey: (state, e) => modalActions.getKey(state, e),

    chooseSelect: (state, modalID, inputID, numData, textData) => modalActions.chooseSelect(state, modalID, inputID, numData, textData),
    clickOutNewHomeworkModal: (state, e) => modalActions.clickOutNewHomeworkModal(state, e),
    clickOutNewLessonModal: (state, e) => modalActions.clickOutNewLessonModal(state, e),

    deleteOneLesson: (state) => modalActions.deleteOneLesson(state),
    deleteOneHomework: (state) => modalActions.deleteOneHomework(state),
    deleteModulesModal: (state, e) => modalActions.deleteModulesModal(state, e),
    deleteLessonsModal: (state, e) => modalActions.deleteLessonsModal(state, e),
    deleteOneLessonModal: (state) => modalActions.deleteOneLessonModal(state),
    deleteOneHomeworkModal: (state) => modalActions.deleteOneHomeworkModal(state),
    deleteMarksModal: (state, e) => modalActions.deleteMarksModal(state, e),

    initTableData: (state, type, page = null) => tableActions.initTableData(state, type, page),
    clickCheckbox: (state, e, index) => tableActions.clickCheckbox(state, e, index),
    clickAllCheckbox: (state) => tableActions.clickAllCheckbox(state),

    removeSelection: (state) => editPanelActions.removeSelection(state),
    moveUp: (state, type) => editPanelActions.moveUp(state, type),
    moveDown: (state, type) => editPanelActions.moveDown(state, type),
    editCheck: (state, type) => editPanelActions.editCheck(state, type)
};

export default actions;