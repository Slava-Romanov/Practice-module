import { Fragment, render, h } from 'preact';

import findIcon from './../../images/findIcon.svg';
import closeIcon from './../../images/closeIcon.svg';
import upIcon from './../../images/upIcon.svg';
import downIcon from './../../images/downIcon.svg';
import penIcon from './../../images/penIcon.svg';
import trashIcon from './../../images/trashIcon.svg';
import editIcon from './../../images/editIcon.svg';

import { newModuleModal, editModuleModal } from './../Modal/modal';

export const createPageModules = (store) => {
    store.tmp = {};
    store.tmp.entry_count = 0;
    store.tmp.search = '';
    addTopBlock(store);
    addTable(store);

    document.addEventListener('keydown', e => getKey(e, store));
};

const addTopBlock = (store) => {
    const top_block = <Fragment>
        <div className="search">
            <img src={findIcon}/>
            <input className="search_input" id="search_main_input" type="text" onInput={ e => searchInput(e, store) }>
            </input>
        </div>
        <button className="blue_btn" onClick={ e => newModuleModal(e, store) }> +Новый модуль </button>
    </Fragment>;

    render(top_block, document.getElementById('top_block'));
};


const createSearchNumArr = (store) => {
    store.tmp.searchNumArr = [];
    for (let i = 0; i < store.modules.length; i++) {
        if (store.modules[i].name.toLowerCase().includes(store.tmp.search)) {
            store.tmp.searchNumArr.push(store.modules[i].num);
        }
    }
};

const searchInput = (evt, store) => {
    store.tmp.search = evt.currentTarget.value.toLowerCase();
    createSearchNumArr(store);
    //console.log(searchNumA4r);
    store.tmp.last_check = null;
    addTable(store);
    //if (!store.tmp.searchNumArr.length) {
    const checkbox = document.getElementById("all_check");
    checkbox.checked = false;
    closeEditPanel();

    for (let i = 0; i < store.tmp.entry_count; i++) {
        document.getElementById("module_check_" + i).checked = false;
        document.getElementById("module_tr_" + i).classList.remove("checked");
    }
    //}
};

const addTable = (store) => {
    const entries = addModules(store);
    let disabled = true;
    if (store.tmp.entry_count > 0) {
        disabled = false;
    }

    const top_table =
        <tr>
            <th><input type="checkbox" id="all_check" onClick={ e => allCheckBox(e, store) } disabled={disabled}/></th>
            <th>№</th>
            <th>Название</th>
            <th>Занятий</th>
            <th>Баллы</th>
            <th></th>
        </tr>;

    const table = h(
        'table',
        { },
        [top_table, entries]
    );

    const label =
        <h1>
            Таблица модулей дисциплины
        </h1>;

    render([label, table], document.getElementById('table_block'));
};

const getKey = (evt, store) => {
    if (evt.code === 'Escape') {
        const checkbox = document.getElementById("all_check");
        checkbox.checked = false;
        let newEvt = {};
        newEvt.currentTarget = checkbox;
        allCheckBox(newEvt, store);
    }
};

const addModules = (store) => {
    let data_table = [];
    if (!store.tmp.searchNumArr) {
        for(let i = 0; i < store.modules.length; i++) {
            console.log(i);
            data_table.push(createLine(store, i));
        }
        store.tmp.entry_count = store.modules.length;
    }  else {
        for(let i = 0; i < store.tmp.searchNumArr.length; i++) {
            data_table.push(createLine(store, store.tmp.searchNumArr[i], i));
        }
        store.tmp.entry_count = store.tmp.searchNumArr.length;
    }

    return data_table;
};

const createLine = (store, i, num = i) => {
    //console.log(store.modules[i].name);
    // console.log(i);
    let name = store.modules[i].name;
    let findIndex = store.modules[i].name.toLowerCase().indexOf(store.tmp.search);
    let startStr = '', middleStr = '', endStr = '';
    if (findIndex !== -1) {
        startStr = store.modules[i].name.substring(0, findIndex);
        middleStr = store.modules[i].name.substring(findIndex, findIndex + store.tmp.search.length);
        endStr = store.modules[i].name.substring(findIndex + store.tmp.search.length, store.modules[i].name.length);
        name = <Fragment>{startStr}<span className='yellow'>{middleStr}</span>{endStr}</Fragment>;
    }

    return <tr id={"module_tr_" + num}>
        <td id={'module_td_check_' + num} onClick={ e => changeTdCheckbox(e, store)}>
            <input type="checkbox" id={"module_check_" + num} num={store.modules[i].num} onClick={ e => changeCheckbox(e, store) }/>
        </td>
        <td>{Number(store.modules[i].num)+1}</td>
        <td>{name}</td>
        <td>{countLessons(store, store.modules[i].num)}</td>
        <td>{store.modules[i].max_points}</td>
        <td><img id={"pen_" + store.modules[i].num} src={editIcon} onClick={ e => editModule(e, store) }/></td>
    </tr>;
};

const editModule = (evt, store) => {
    editModuleModal(evt, store, evt.currentTarget.id.split('_')[1]);
};

const createEditPanel = (evt, store) => {
    const edit_panel =
         <div className="edit_panel">
             <button className="grey_btn" onClick={e => removeSelection(e, store)}><img src={closeIcon}/>Снять выделение </button>
             <button className="grey_btn" id="UpEP" onClick={e => moveUp(e, store)}><img src={upIcon}/> Переместить выше </button>
             <button className="grey_btn" id="DownEP" onClick={e => moveDown(e, store)}><img src={downIcon}/> Переместить ниже </button>
             <button className="grey_btn" id="EditEP" onClick={e => editCheck(e, store)}><img src={penIcon}/> Редактировать </button>
             <button className="red_btn"><img src={trashIcon}/> Удалить </button>
         </div>;

    render(edit_panel, document.getElementById('edit_panel'));
};

const swapModules = (store, a, b) => {
    let tmp = store.modules[a];
    store.modules[a] = store.modules[b];
    store.modules[b] = tmp;
    store.modules[b].num++;
    store.modules[a].num--;
};

const editCheck = (evt, store) => {
    editModuleModal(evt, store, findCheckNum(store));
};

const findCheckNum = (store) => {
    for (let i = 0; i < store.tmp.entry_count; i++) {
        if (document.getElementById("module_check_" + i).checked) {
            return document.getElementById("module_check_" + i).getAttribute('num');
        }
    }
};

export const unCheckAll = (store) => {
    for (let i = 0; i < store.tmp.entry_count; i++) {
        if (document.getElementById("module_check_" + i).checked) {
            document.getElementById("module_check_" + i).checked = false;
            document.getElementById("module_tr_" + i).classList.remove("checked");
        }
    }

    const checkbox = document.getElementById("all_check");
    checkbox.checked = false;

    render(null, document.getElementById('edit_panel'));
};

export const updateTable = (store) => {
    createSearchNumArr(store);
    addTable(store);
};

const moveUp = (evt, store) => {
    let check_num = [];
    for (let i = 0; i < store.tmp.entry_count; i++) {
        const check = document.getElementById("module_check_" + i);
        if (check.checked) {
            swapModules(store, check.getAttribute('num')-1, check.getAttribute('num'));
            check_num.push(check.getAttribute('num')-1);
        }
    }

    updateTable(store);
    unCheckAll(store);

    let cn_index = 0;
    for (let i = 0; i < store.tmp.entry_count; i++) {
        const check = document.getElementById("module_check_" + i);
        if (check_num[cn_index] === Number(check.getAttribute('num'))) {
            document.getElementById("module_check_" + i).checked = true;
            document.getElementById("module_tr_" + i).classList.add("checked");

            if (i === 0) {
                document.getElementById("UpEP").disabled = true;
            }

            if (i + 1 === store.tmp.entry_count - 1) {
                document.getElementById("DownEP").disabled = false;
            }

            cn_index++;
            if (cn_index === check_num.length) {
                break;
            }
        }
    }
};

const moveDown = (evt, store) => {
    let check_num = [];
    for (let i = store.tmp.entry_count - 1; i > -1; i--) {
        const check = document.getElementById("module_check_" + i);
        if (check.checked) {
            swapModules(store, check.getAttribute('num'), Number(check.getAttribute('num'))+1);
            check_num.push(Number(check.getAttribute('num'))+1);
        }
    }

    updateTable(store);
    unCheckAll(store);

    let cn_index = 0;
    for (let i = store.tmp.entry_count - 1; i > -1; i--) {
        const check = document.getElementById("module_check_" + i);

        if (check_num[cn_index] === Number(check.getAttribute('num'))) {
            document.getElementById("module_check_" + i).checked = true;
            document.getElementById("module_tr_" + i).classList.add("checked");

            if (i - 1 === 0) {
                document.getElementById("UpEP").disabled = false;
            }

            if (i === store.tmp.entry_count - 1) {
                document.getElementById("DownEP").disabled = true;
            }

            cn_index++;
            if (cn_index === check_num.length) {
                break;
            }
        }
    }
};

const removeSelection = (evt, store) => {
    closeEditPanel(evt);

    const checkbox = document.getElementById("all_check");
    checkbox.checked = !checkbox.checked;
    let newEvt = {};
    newEvt.currentTarget = checkbox;
    allCheckBox(newEvt, store);
};

const closeEditPanel = (evt) => {
    render(null, document.getElementById('edit_panel'));
};

const allCheckBox = (evt, store) => {
    for(let i = 0; i < store.tmp.entry_count; i++) {
        document.getElementById("module_check_" + i).checked = evt.currentTarget.checked;
        if (evt.currentTarget.checked) {
            document.getElementById("module_tr_" +i).classList.add("checked");
        } else {
            document.getElementById("module_tr_" +i).classList.remove("checked");
        }
    }

    if (!evt.currentTarget.checked) {
        store.tmp.last_check = undefined;
        closeEditPanel(evt);
    } else {
        createEditPanel(evt, store);
        if (store.tmp.entry_count > 1) {
            document.getElementById("EditEP").disabled = true;
        }
        document.getElementById("UpEP").disabled = true;
        document.getElementById("DownEP").disabled = true;
    }
};

const changeCheckbox = (evt, store) => {
    if (!store.tmp.last_check && evt.shiftKey) {
        //alert("1");
        for(let i = 0; i < evt.currentTarget.id.split('_')[2]; i++) {
            document.getElementById("module_check_" + i).checked = true;
            document.getElementById("module_tr_" + i).classList.add("checked");
        }
    } else if (evt.shiftKey) {
        // alert(store.tmp.last_check);
        // alert(evt.currentTarget.id.split('_')[2]);
        const vector =  Math.sign(evt.currentTarget.id.split('_')[2] - store.tmp.last_check);
        //console.log(evt.currentTarget.id.split('_')[2]);
        let start = Number(store.tmp.last_check) + vector;
        let end = evt.currentTarget.id.split('_')[2];
        if (vector < 0) {
            start = Number(evt.currentTarget.id.split('_')[2]) - vector;
            end = Number(store.tmp.last_check);
        }
        for (let i = start; i < end; i++) {
            if (!document.getElementById("module_check_" + i).checked) {
                document.getElementById("module_check_" + i).checked = true;
                document.getElementById("module_tr_" + i).classList.add("checked");
            } else {
                document.getElementById("module_check_" + i).checked = false;
                document.getElementById("module_tr_" + i).classList.remove("checked");
            }
        }
    }

    store.tmp.last_check = Number(evt.currentTarget.id.split('_')[2]);

    if (evt.currentTarget.checked) {
        document.getElementById("module_tr_" + store.tmp.last_check).classList.add("checked");
        document.getElementById("all_check").checked = true;
        createEditPanel(evt, store);

        if (store.tmp.last_check === 0) {
            document.getElementById("UpEP").disabled = true;
            //document.getElementById("DownEP").disabled = true;
        } else if (store.tmp.entry_count - 1 === store.tmp.last_check) {
            document.getElementById("DownEP").disabled = true;
        }

    } else {
        document.getElementById("module_tr_" + store.tmp.last_check).classList.remove("checked");

        if (store.tmp.last_check === 0) {
            document.getElementById("UpEP").disabled = false;
            //document.getElementById("DownEP").disabled = true;
        } else if (store.tmp.entry_count - 1 === store.tmp.last_check) {
            document.getElementById("DownEP").disabled = false;
        }
    }

    let count = 0;
    for(let i = 0; i < store.tmp.entry_count; i++) {
        if (document.getElementById("module_check_" + i).checked) {
            count++;
        }
    }
    //alert(count);
    if (count > 1) {
        document.getElementById("EditEP").disabled = true;
    } else if (count === 0) {
        closeEditPanel(evt);
        store.tmp.last_check = undefined;
        document.getElementById("all_check").checked = false;
    } else {
        document.getElementById("EditEP").disabled = false;
    }
};

const changeTdCheckbox = (evt, store) => {
    if (evt.target.id !== evt.currentTarget.id) {
        return;
    }
    const checkbox = document.getElementById("module_check_" +  evt.currentTarget.id.split('_')[3]);
    checkbox.checked = !checkbox.checked;
    let newEvt = {};
    newEvt.currentTarget = checkbox;
    changeCheckbox(newEvt, store);
};

const countLessons = (store, num) => {
    let count_module_lessons = 0;
    for (let i = 0; i < store.lessons.length; i++) {
        if (store.lessons[i].module === num) {
            count_module_lessons++;
        }
    }
    return count_module_lessons;
};