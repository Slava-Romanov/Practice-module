import closeIcon from "../../../images/closeIcon.svg";
import upIcon from "../../../images/upIcon.svg";
import downIcon from "../../../images/downIcon.svg";
import penIcon from "../../../images/penIcon.svg";
import trashIcon from "../../../images/trashIcon.svg";
import {render, h} from "preact";
import {uncheckAll, getFirstChecked, getChecked, addTable, checkControl, changeCheckbox} from "../Table/table";
import {editModuleModal, deleteModuleModal} from "../Modal/modal";
import Storage from "../../utils/store";

export const showEditPanel = (moveUpBool, moveDownBool, isEditBool) => {
    const edit_panel =
        <div className='edit_panel'>
            <button className='grey_btn' onClick={e => removeSelection(e)}><img src={closeIcon}/>Снять выделение </button>
            <button className='grey_btn' id='UpEP' onClick={e => moveUp(e)} disabled={moveUpBool}><img src={upIcon}/> Переместить выше </button>
            <button className='grey_btn' id='DownEP' onClick={e => moveDown(e)} disabled={moveDownBool}><img src={downIcon}/> Переместить ниже </button>
            <button className='grey_btn' id='EditEP' onClick={e => editCheck(e)} disabled={isEditBool}><img src={penIcon}/> Редактировать </button>
            <button className='red_btn' onClick={e => deleteModuleModal(e)}><img src={trashIcon}/> Удалить </button>
        </div>;

    render(edit_panel, document.getElementById('edit_panel'));
};

const removeSelection = (evt) => {
    uncheckAll();
    hideEditPanel();
};

const editCheck = () => {
    editModuleModal(getFirstChecked());
};

export const hideEditPanel = () => {
    render(null, document.getElementById('edit_panel'));
};

const moveUp = (evt) => {
    const checked = getChecked();
    for (const value of checked) {
        Storage.moveUp('modules', value);
    }
    const searchString = document.getElementById('search_main_input').value.toLowerCase();
    const elements = Storage.generateSelection('modules', searchString);
    addTable(elements, 'modules', 'Таблица модулей дисциплины', searchString);
    uncheckAll();

    for (const value of checked) {
        changeCheckbox(value-1);
    }

    checkControl();
};

const moveDown = (evt) => {
    const checked = getChecked().reverse();
    for (const value of checked) {
        Storage.moveDown('modules', value);
    }
    const searchString = document.getElementById('search_main_input').value.toLowerCase();
    const elements = Storage.generateSelection('modules', searchString);
    addTable(elements, 'modules', 'Таблица модулей дисциплины', searchString);
    uncheckAll();

    for (const value of checked) {
        changeCheckbox(value+1);
    }

    checkControl();
};