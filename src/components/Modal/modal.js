import { Fragment, render, h } from 'preact';

import closeModalIcon from './../../images/closeModalIcon.svg';
import {unCheckAll, updateTable} from '../Modules/modules';

export const newModuleModal = (evt, store) => {
    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }><img src={closeModalIcon}/>
            </div>
            <div className='title'>Создание нового модуля
            </div>
            <div id='infoModalMessage'>
            </div>
            <div className='line'>
                <input type='text' id='nameModal' required placeholder='Название модуля'>
                </input>
            </div>
            <div id='errNameModal'>
                </div>
            <div className='line'>
                <input type='text' id='pointsModal' required placeholder='Максимальное количество баллов'>
                </input>
            </div>
            <div id='errPointsModal'>
            </div>
            <a>
                <input type='submit' className='blue_btn' value='Создать' onClick={ e => addModule(e, store) }>
                </input>
            </a>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};

export const editModuleModal = (evt, store, id) => {
    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }><img src={closeModalIcon}/>
            </div>
            <div className='title'>Изменение модуля
            </div>
            <div id='infoModalMessage'>
            </div>
            <div className='line'>
                <input type='text' id='nameModal' required placeholder='Название модуля' value={store.modules[id].name}>
                </input>
            </div>
            <div id='errNameModal'>
            </div>
            <div className='line'>
                <input type='text' id='pointsModal' required placeholder='Максимальное количество баллов' value={store.modules[id].max_points}>
                </input>
            </div>
            <div id='errPointsModal'>
            </div>
            <a>
                <input type='submit' className='blue_btn' value='Сохранить' onClick={ e => addModule(e, store, id) }>
                </input>
            </a>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};

export const deleteModuleModal = (evt, store, checked) => {
    let text = 'Вы действительно хотите удалить выбранный модуль?';
    if (checked.length > 1) {
        text = 'Вы действительно хотите удалить выбранные модули?';
    }

    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }><img src={closeModalIcon}/>
            </div>
            <div className='title'>{text}
            </div>
            <div className='center err'>
                Внимание! Вместе с удалением каждого модуля,<br/>удаляются связанные с ним занятия,<br/>домашние задания и оценки
            </div>
            <div className='choice'>
                <input type='submit' className='blue_btn' value='Да' onClick={ e => deleteModule(e, store, checked) }/>
                <input type='submit' className='blue_btn' value='Нет' onClick={ e => closeModal(e) }/>
            </div>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};

export const deleteModule = (evt, store, checked) => {
    // todo: Рекурсивное удаление занятий, дз, оценок
    let cn_index = checked.length - 1;
    for (let i = store.modules.length - 1; i > -1; i--) {
        if (store.modules[i].num == checked[cn_index]) {
            store.modules.splice(i, 1);
            for (let j = i; j < store.modules.length; j++) {
                store.modules[j].num--;
            }
            cn_index--;
        }
    }
    updateTable(store);
    unCheckAll(store);

    render(null, document.getElementById('edit_panel'));
    infoModuleModal('Удаление успешно произведено');
};

export const closeModal = (evt) => {
    render(null, document.getElementById('modal'));
};

export const addModule = (evt, store, id = null) => {
    const name = document.getElementById('nameModal').value;
    const points = document.getElementById('pointsModal').value;

    let textNameErr = null;
    if (name === '') {
        textNameErr = 'Введите название модуля'
    }

    if (textNameErr) {
        const err = <div className='err'>
            {textNameErr}
        </div>;
        render(err, document.getElementById('errNameModal'));
    } else {
        render(null, document.getElementById('errNameModal'));
    }

    let textPointsErr = null;
    if (!Number(points) || Number(points) <= 0) {
        textPointsErr = 'Введенное значение должно быть положительным числом';
    }

    if (textPointsErr) {
        const err = <div className='err'>
            {textPointsErr}
        </div>;
        render(err, document.getElementById('errPointsModal'));
    } else {
        render(null, document.getElementById('errPointsModal'));
    }

    if (!textNameErr && !textPointsErr) {
        //console.log(store.modules.length);
        if (!id) {
            store.modules.push({name:name, max_points:points, num:store.modules.length});
            //console.log(store.modules.length);
            render(null, document.getElementById('modal'));
            infoModuleModal('Модуль успешно создан');
        } else {
            for(let i = 0; i < store.modules.length; i++) {
                if(store.modules[i].num == id) {
                    store.modules[i].name = name;
                    store.modules[i].max_points = points;
                    break;
                }
            }
            render(null, document.getElementById('modal'));
            infoModuleModal('Изменения модуля успешно сохранены');
        }
        updateTable(store);
        unCheckAll(store);
        render(null, document.getElementById('edit_panel'));
    }
};

export const infoModuleModal = (info) => {
    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }><img src={closeModalIcon}/>
            </div>
            <div className='title_info'>{info}
            </div>
            <a>
                <input type='submit' className='blue_btn' value='Ок' onClick={ e => closeModal(e) }/>
            </a>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};