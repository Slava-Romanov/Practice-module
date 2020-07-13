import React from "react";
import ReactDOM from 'react-dom'
import { h } from 'preact';
import './index.css'
import findIcon from './images/findIcon.svg';

import closeIcon from './images/closeIcon.svg';
import upIcon from './images/upIcon.svg';
import downIcon from './images/downIcon.svg';
import penIcon from './images/penIcon.svg';
import trashIcon from './images/trashIcon.svg';

import data from './data.json';

const page = <div><div className="page">
    <div className="page_content">
        <div id="modal">
        </div>
        <div id="top_block">

        </div>
        <div id="table_block">

            </div>
        <div id="bottom_block">
        </div>
    </div>
</div>
    <div id="edit_panel">
    </div></div>;
ReactDOM.render(page, document.getElementById('root'));

const top_block = <div className="top_block">
    <div className="search">
    <img src={findIcon}/>
    <input className="search_input" id="search_main_input" type="text">
        </input>
    </div>
    <button className="blue_btn"> +Новый модуль </button></div>;

ReactDOM.render(top_block, document.getElementById('top_block'));

const edit_panel =
    <div className="fixed_panel">
    <div className="edit_panel">
    <button className="grey_btn"> <img src={closeIcon}/>Снять выделение </button>
        <button className="grey_btn"><img src={upIcon}/> Переместить выше </button>
        <button className="grey_btn"><img src={downIcon}/> Переместить ниже </button>
        <button className="grey_btn"><img src={penIcon}/> Редактировать </button>
        <button className="red_btn"><img src={trashIcon}/> Удалить </button>
    </div> </div>;

ReactDOM.render(edit_panel, document.getElementById('edit_panel'));


const checkbox = h(
    'th',
    { },
    h(
        'input',
        { type: 'checkbox', name: "option2"},//, disabled : "disabled", checked : "checked"
        ' ')
);

const num = h(
    'th',
    { },
    '№'
);

const name = h(
    'th',
    { },
    'Название'
);

const lessons = h(
    'th',
    { },
    'Занятий'
);

const points = h(
    'th',
    { },
    'Баллы'
);

const edit = h(
    'th',
    { },
    ' '
);

const up_table = h(
    'tr',
    { },
    [checkbox, num, name, lessons, points, edit]
);

let all_table = [up_table];

for (let i = 0; i < data.modules.length; i++) {
    const checkbox = h(
        'td',
        { },
        h(
            'input',
            { type: 'checkbox', name: "option2"},//, disabled : "disabled", checked : "checked"
            ' ')
    );

    const num = h(
        'td',
        { },
        data.modules[i].num
    );

    const name = h(
        'td',
        { },
        data.modules[i].name
    );

    const lessons = h(
        'td',
        { },
        data.modules[i].num
    );

    const points = h(
        'td',
        { },
        data.modules[i].max_points
    );

    const edit = h(
        'td',
        { },
        h(
            'div',
            { className : 'edit' },
            {}
        )
    );

    const tr = h(
        'tr',
        { },
        [checkbox, num, name, lessons, points, edit]
    );

    all_table.push(tr);
}


const table = h(
    'table',
    { },
    all_table
);


ReactDOM.render(
    table,
    document.getElementById('table_block')
);