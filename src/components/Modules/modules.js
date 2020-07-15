import { Fragment, render, h } from 'preact';

import findIcon from './../../images/findIcon.svg';
import closeIcon from './../../images/closeIcon.svg';
import upIcon from './../../images/upIcon.svg';
import downIcon from './../../images/downIcon.svg';
import penIcon from './../../images/penIcon.svg';
import trashIcon from './../../images/trashIcon.svg';

export const createPageModules = (store) => {
    addTopBlock(store);
    addTable(store);

    document.addEventListener('keydown', e => getKey(e, store));
};

const addTopBlock = (store) => {
    const top_block = <Fragment>
        <div className="search">
            <img src={findIcon}/>
            <input className="search_input" id="search_main_input" type="text">
            </input>
        </div>
        <button className="blue_btn"> +Новый модуль </button>
    </Fragment>;

    render(top_block, document.getElementById('top_block'));
};

const addTable = (store) => {
    const top_table =
        <tr>
            <th><input type="checkbox" id="all_check" onClick={ e => allCheckBox(e, store) } /></th>
            <th>№</th>
            <th>Название</th>
            <th>Занятий</th>
            <th>Баллы</th>
        </tr>;

    const table = h(
        'table',
        { },
        [top_table, addModules(store)]
    );

    render([table], document.getElementById('table_block'));
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
    for(let i = 0; i < store.modules.length; i++) {
        data_table.push(<tr id={"module_tr_" + i}>
            <td id={'module_td_check_' + i} onClick={ e => changeTdCheckbox(e, store)}>
                <input type="checkbox" id={"module_check_" + i} onClick={ e => changeCheckbox(e, store) }/>
            </td>
            <td>{store.modules[i].num}</td>
            <td>{store.modules[i].name}</td>
            <td>{countLessons(store, i)}</td>
            <td>{store.modules[i].max_points}</td>
        </tr>);
    }
    return data_table;
};

const createEditPanel = (evt, store) => {
    const edit_panel =
         <div className="edit_panel">
             <button className="grey_btn"> <img src={closeIcon}/>Снять выделение </button>
             <button className="grey_btn"><img src={upIcon}/> Переместить выше </button>
             <button className="grey_btn"><img src={downIcon}/> Переместить ниже </button>
             <button className="grey_btn"><img src={penIcon}/> Редактировать </button>
             <button className="red_btn"><img src={trashIcon}/> Удалить </button>
         </div>;

    render(edit_panel, document.getElementById('edit_panel'));
};

const closeEditPanel = (evt) => {
    render(null, document.getElementById('edit_panel'));
};

const allCheckBox = (evt, store) => {
    for(let i = 0; i < store.modules.length; i++) {
        document.getElementById("module_check_" + i).checked = evt.currentTarget.checked;
        if (evt.currentTarget.checked) {
            document.getElementById("module_tr_" +i).classList.add("checked");
        } else {
            document.getElementById("module_tr_" +i).classList.remove("checked");
        }
    }

    if (!evt.currentTarget.checked) {
        store.last_check = undefined;
        closeEditPanel(evt);
    } else {
        createEditPanel(evt, store);
    }
};

const changeCheckbox = (evt, store) => {
    if (!store.last_check && evt.shiftKey) {
        //alert("1");
        for(let i = 0; i < evt.currentTarget.id.split('_')[2]; i++) {
            document.getElementById("module_check_" + i).checked = true;
            document.getElementById("module_tr_" + i).classList.add("checked");
        }
    } else if (evt.shiftKey) {
        // alert(store.last_check);
        // alert(evt.currentTarget.id.split('_')[2]);
        const vector =  Math.sign(evt.currentTarget.id.split('_')[2] - store.last_check);
        //console.log(evt.currentTarget.id.split('_')[2]);
        let start = Number(store.last_check) + vector;
        let end = evt.currentTarget.id.split('_')[2];
        if (vector < 0) {
            start = Number(evt.currentTarget.id.split('_')[2]) - vector;
            end = Number(store.last_check);
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

    store.last_check = evt.currentTarget.id.split('_')[2];

    if (evt.currentTarget.checked) {
        document.getElementById("module_tr_" + evt.currentTarget.id.split('_')[2]).classList.add("checked");
        document.getElementById("all_check").checked = true;
        createEditPanel(evt, store);
        // for(let i = 0; i < store.modules.length; i++) {
        //     if (document.getElementById("module_check_" + i).checked) {
        //         createEditPanel(evt, store);
        //         return;
        //     }
        // }

        //alert(store.last_check);



        // if (evt.shiftKey) {
        //
        // }
    } else {
        document.getElementById("module_tr_" + evt.currentTarget.id.split('_')[2]).classList.remove("checked");
        for(let i = 0; i < store.modules.length; i++) {
            if (document.getElementById("module_check_" + i).checked) {
                return;
            }
        }

        closeEditPanel(evt);
        store.last_check = undefined;
        document.getElementById("all_check").checked = false;
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

//
// const edit_panel =
//     <div className="fixed_panel">
//         <div className="edit_panel">
//             <button className="grey_btn"> <img src={closeIcon}/>Снять выделение </button>
//             <button className="grey_btn"><img src={upIcon}/> Переместить выше </button>
//             <button className="grey_btn"><img src={downIcon}/> Переместить ниже </button>
//             <button className="grey_btn"><img src={penIcon}/> Редактировать </button>
//             <button className="red_btn"><img src={trashIcon}/> Удалить </button>
//         </div> </div>;
//
// ReactDOM.render(edit_panel, document.getElementById('edit_panel'));
//
//
// const checkbox = h(
//     'th',
//     { },
//     h(
//         'input',
//         { type: 'checkbox', name: "option2"},//, disabled : "disabled", checked : "checked"
//         ' ')
// );
//
// const num = h(
//     'th',
//     { },
//     '№'
// );
//
// const name = h(
//     'th',
//     { },
//     'Название'
// );
//
// const lessons = h(
//     'th',
//     { },
//     'Занятий'
// );
//
// const points = h(
//     'th',
//     { },
//     'Баллы'
// );
//
// const edit = h(
//     'th',
//     { },
//     ' '
// );
//
// const up_table = h(
//     'tr',
//     { },
//     [checkbox, num, name, lessons, points, edit]
// );
//
// let all_table = [up_table];
//
// for (let i = 0; i < data.modules.length; i++) {
//     const checkbox = h(
//         'td',
//         { },
//         h(
//             'input',
//             { type: 'checkbox', name: "option2"},//, disabled : "disabled", checked : "checked"
//             ' ')
//     );
//
//     const num = h(
//         'td',
//         { },
//         data.modules[i].num
//     );
//
//     const name = h(
//         'td',
//         { },
//         data.modules[i].name
//     );
//
//     const lessons = h(
//         'td',
//         { },
//         data.modules[i].num
//     );
//
//     const points = h(
//         'td',
//         { },
//         data.modules[i].max_points
//     );
//
//     const edit = h(
//         'td',
//         { },
//         h(
//             'div',
//             { className : 'edit' },
//             {}
//         )
//     );
//
//     const tr = h(
//         'tr',
//         { },
//         [checkbox, num, name, lessons, points, edit]
//     );
//
//     all_table.push(tr);
// }
//
//
// const table = h(
//     'table',
//     { },
//     all_table
// );
//
//
// ReactDOM.render(
//     table,
//     document.getElementById('table_block')
// );