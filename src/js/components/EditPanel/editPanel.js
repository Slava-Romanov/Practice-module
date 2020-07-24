import {render, h} from 'preact';

import Storage from '../../utils/store';
import {uncheckAll, getFirstChecked, getChecked, addTable, checkControl, changeCheckbox} from '../Table/table';
import {editModuleModal, deleteModuleModal} from '../Modal/modal';

import closeIcon from '../../../images/closeIcon.svg';
import upIcon from '../../../images/upIcon.svg';
import downIcon from '../../../images/downIcon.svg';
import penIcon from '../../../images/penIcon.svg';
import trashIcon from '../../../images/trashIcon.svg';

export const showEditPanel = (moveUpBool, moveDownBool, isEditBool) => {
    const edit_panel =
        <div className='edit_panel'>
            <button className='grey_btn' onClick={() => removeSelection()}>
                <img src={closeIcon}/>Снять выделение
            </button>
            <button className='grey_btn' id='UpEP' onClick={() => moveUp()} disabled={moveUpBool}>
                <img src={upIcon}/> Переместить выше
            </button>
            <button className='grey_btn' id='DownEP' onClick={() => moveDown()} disabled={moveDownBool}>
                <img src={downIcon}/> Переместить ниже
            </button>
            <button className='grey_btn' id='EditEP' onClick={() => editCheck()} disabled={isEditBool}>
                <img src={penIcon}/> Редактировать
            </button>
            <button className='red_btn' onClick={e => deleteModuleModal(e)}>
                <img src={trashIcon}/> Удалить
            </button>
        </div>;

    render(edit_panel, document.getElementById('edit_panel'));
};

const removeSelection = () => {
    uncheckAll();
    checkControl();
    hideEditPanel();
};

const editCheck = () => {
    editModuleModal(getFirstChecked());
};

export const hideEditPanel = () => {
    render(null, document.getElementById('edit_panel'));
};

const moveUp = () => {
    const checked = getChecked();
    for (const value of checked) {
        Storage.moveUp('modules', value);
    }
    addTable('modules');
    uncheckAll();

    for (const value of checked) {
        changeCheckbox(value-1);
    }

    checkControl();
};

const moveDown = () => {
    const checked = getChecked().reverse();
    for (const value of checked) {
        Storage.moveDown('modules', value);
    }
    addTable('modules');
    uncheckAll();

    for (const value of checked) {
        changeCheckbox(value+1);
    }

    checkControl();
};