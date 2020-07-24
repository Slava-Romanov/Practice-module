import { Fragment, render, h } from 'preact';
import findIcon from '../../../images/findIcon.svg';
import {newModuleModal} from '../Modal/modal';
import Storage from '../../utils/store';
import {addTable, uncheckAll, checkControl} from '../Table/table';

export const addTopBlock = (type) => {
    let searchUpdate = searchModulesUpdate;
    let newElementModal = newModuleModal;

    switch (type) {
        case 'modules':
            searchUpdate = searchModulesUpdate;
            newElementModal = newModuleModal;
            break;
        case 'lessons':
            break;
        case 'homeworks':
            break;
    }

    const top_block = <Fragment>
        <div className='search'>
            <img src={findIcon}/>
            <input className='search_input' id='search_main_input' type='text' onInput={ e => searchUpdate(e) }>
            </input>
        </div>
        <button className='blue_btn' onClick={ e => newElementModal(e) }> +Новый модуль </button>
    </Fragment>;

    render(top_block, document.getElementById('top_block'));
};

const searchModulesUpdate = (evt) => {
    addTable('modules');
    uncheckAll();
    checkControl();
};