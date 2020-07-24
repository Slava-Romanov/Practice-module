import { Fragment, h, render } from 'preact';

import Storage from '../../utils/store'
import { editModuleModal } from '../Modal/modal';
import { hideEditPanel, showEditPanel } from '../EditPanel/editPanel';

import editIcon from '../../../images/editIcon.svg';

export const addTable = (type, search = null) => {
    if (search === null) {
        search = document.getElementById('search_main_input').value.toLowerCase();
    }
    const elements = Storage.generateSelection(type, search);
    let disabled = true;
    if (elements.length > 0) {
        disabled = false;
    }

    let addTopTable = addModuleTopTable;
    let elementsTable = [];
    let label = '';

    switch (type) {
        case 'modules':
            addTopTable = addModuleTopTable;
            elementsTable = addModuleLines(elements, search);
            label = 'Таблица модулей дисциплины';
            break;
        case 'lessons':
            break;
        case 'homeworks':
            break;
    }

    const table = h(
        'table',
        { 'name' : 'modules' },
        [addTopTable(disabled, elements.length), elementsTable]
    );
    const heading =
        <h1>
            {label}
        </h1>;
    render([heading, table], document.getElementById('table_block'));
    document.addEventListener('keydown', e => getKey(e));
};

const getKey = (evt) => {
    if (evt.code === 'Escape') {
        uncheckAll();
        checkControl();
    }
};

const addModuleTopTable = (disabled, count) => {
    return <tr>
            <th onClick={ e => clickAllCheckbox(e) }>
                <input type='checkbox' id='all_check' disabled={disabled} data-count={count}/>
            </th>
            <th>№</th>
            <th>Название</th>
            <th>Занятий</th>
            <th>Баллы</th>
            <th></th>
        </tr>;
};

const addModuleLines = (elements, search = null) => {
    let lines = [];
    for(const [i, el] of elements.entries()) {
        lines.push(<tr data-index={i} data-num={el.num}>
            <td onClick={e => clickCheckbox(e)}>
                <input type='checkbox' id={'check_' + i}/>
            </td>
            <td>
                {Number(el.num) + 1}
            </td>
            <td>
                {fillSearch(el.name, search)}
            </td>
            <td>
                {Storage.getCountModuleLessons(el.num)}
            </td>
            <td>
                {el.max_points}
            </td>
            <td onClick={() => editModuleModal(el.num)}>
                <img src={editIcon}/>
            </td>
        </tr>);
    }
    return lines;
};

export const changeCheckbox = (id, needRecheck = true, state = null) => {
    const checkbox = document.getElementById('check_' + id);
    if (state === null) {
        if (needRecheck) {
            checkbox.checked ^= true;
        }
        if (checkbox.checked) {
            checkbox.parentElement.parentElement.classList.add("checked");
        } else {
            checkbox.parentElement.parentElement.classList.remove("checked");
        }
    } else {
        if (state) {
            checkbox.checked = true;
            checkbox.parentElement.parentElement.classList.add("checked");
        } else {
            checkbox.checked = false;
            checkbox.parentElement.parentElement.classList.remove("checked");
        }
    }
};

export const checkAll = () => {
    const all_check = document.getElementById('all_check');
    const count = all_check.getAttribute('data-count');
    for (let i = 0; i < count; i++) {
        changeCheckbox(i, true, true);
    }
};

export const uncheckAll = () => {
    const all_check = document.getElementById('all_check');
    const count = all_check.getAttribute('data-count');
    for (let i = 0; i < count; i++) {
        changeCheckbox(i, true, false);
    }
};

export const checkControl = () => {
    const all_check = document.getElementById('all_check');
    const count = all_check.getAttribute('data-count');
    const checkedCount = countChecked();

    if (checkedCount > 0) {
        const moveUp = document.getElementById('check_0').checked;
        const moveDown = document.getElementById('check_' + (count - 1)).checked;
        const isEdit = !(checkedCount === 1);
        showEditPanel(moveUp, moveDown, isEdit);
        all_check.checked = true;
    } else {
        hideEditPanel();
        all_check.checked = false;
    }
};

export const countChecked = (count = null) => {
    if (!count) {
        const all_check = document.getElementById('all_check');
        count = all_check.getAttribute('data-count');
    }
    let checkedCount = 0;
    for (let i = 0; i < count; i++) {
        document.getElementById('check_' + i).checked ? checkedCount++ : null;
    }
    return checkedCount;
};

export const getFirstChecked = () => {
    const all_check = document.getElementById('all_check');
    const count = all_check.getAttribute('data-count');

    for (let i = 0; i < count; i++) {
        const checkbox = document.getElementById('check_' + i);
        if (checkbox.checked) {
            return i;
        }
    }
};

export const getChecked = () => {
    const all_check = document.getElementById('all_check');
    const count = all_check.getAttribute('data-count');
    let checked = [];

    for (let i = 0; i < count; i++) {
        const checkbox = document.getElementById('check_' + i);
        if (checkbox.checked) {
            checked.push(checkbox.parentElement.parentElement.getAttribute('data-num'));
        }
    }
    return checked;
};

const clickAllCheckbox = (evt) => {
    const all_check = document.getElementById('all_check');
    if (evt.target.id !== 'all_check') {
        all_check.checked ^= true;
    }

    if (all_check.checked) {
        checkAll();
    } else {
        uncheckAll();
    }
    checkControl();
};

const clickCheckbox = (evt) => {
    const index = evt.currentTarget.parentElement.getAttribute('data-index');
    changeCheckbox(index, !evt.target.id.includes('check'));

    if (Storage.tmp.prevCheck != null && evt.shiftKey) {
        if (Storage.tmp.prevCheck < index) {
            checkRange(Storage.tmp.prevCheck, index);
        } else if (Storage.tmp.prevCheck > index) {
            checkRange(index, Storage.tmp.prevCheck);
        }
    }

    checkControl();
    Storage.tmp.prevCheck = index;
};

const checkRange = (from, to) => {
    for (let i = Number(from) + 1; i < to; i++) {
        changeCheckbox(i);
    }
    checkControl();
};

const fillSearch = (name, search) => {
    if (search) {
        const findIndex = name.toLowerCase().indexOf(search);
        let startStr = '', middleStr = '', endStr = '';
        if (findIndex !== -1) {
            startStr = name.substring(0, findIndex);
            middleStr = name.substring(findIndex, findIndex + search.length);
            endStr = name.substring(findIndex + search.length, name.length);
            return <Fragment>
                {startStr}
                <span className='yellow'>
                    {middleStr}
                </span>
                {endStr}
            </Fragment>;
        }
    } else {
        return name;
    }
};