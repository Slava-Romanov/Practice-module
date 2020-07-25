import { render, h } from 'preact';

import Storage from "../../utils/store";
import {addTable, checkControl, countChecked, getChecked, uncheckAll} from "../Table/table";

import closeModalIcon from './../../../images/closeModalIcon.svg';

export const newModuleModal = (evt) => {
    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }>
                <img src={closeModalIcon}/>
            </div>
            <div className='title'>
                Создание нового модуля
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
                <input type='submit' className='standard_btn blue_bg' value='Создать' onClick={ e => addModule(e) }>
                </input>
            </a>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};

export const editModuleModal = (num) => {
    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }>
                <img src={closeModalIcon}/>
            </div>
            <div className='title'>
                Изменение модуля
            </div>
            <div id='infoModalMessage'>
            </div>
            <div className='line'>
                <input type='text' id='nameModal' required placeholder='Название модуля'
                       value={Storage.getModuleByID(num).name}>
                </input>
            </div>
            <div id='errNameModal'>
            </div>
            <div className='line'>
                <input type='text' id='pointsModal' required placeholder='Максимальное количество баллов'
                       value={Storage.getModuleByID(num).max_points}>
                </input>
            </div>
            <div id='errPointsModal'>
            </div>
            <a>
                <input type='submit' className='standard_btn blue_bg'
                       value='Сохранить' onClick={ e => addModule(e, num) }>
                </input>
            </a>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};

export const deleteModuleModal = (evt) => {
    let text = 'Вы действительно хотите удалить выбранный модуль?';
    if (countChecked() > 1) {
        text = 'Вы действительно хотите удалить выбранные модули?';
    }

    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }>
                <img src={closeModalIcon}/>
            </div>
            <div className='title'>
                {text}
            </div>
            <div className='center err'>
                Внимание! Вместе с удалением каждого модуля,<br/>
                удаляются связанные с ним занятия,<br/>
                домашние задания и оценки
            </div>
            <div className='choice'>
                <input type='submit' className='standard_btn blue_bg' value='Да' onClick={ e => deleteModule(e) }/>
                <input type='submit' className='standard_btn blue_bg' value='Нет' onClick={ e => closeModal(e) }/>
            </div>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};

const deleteModule = () => {
    const checked = getChecked();
    for (const value of checked) {
        Storage.deleteModuleByID(value);
    }

    addTable('modules');
    uncheckAll();
    checkControl();
    closeModal();
    infoModuleModal('Удаление успешно произведено');
};

const closeModal = (evt) => {
    render(null, document.getElementById('modal'));
};

const addModule = (evt, num = null) => {
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
        if (num === null) {
            Storage.createModule(name, points);
            closeModal();
            infoModuleModal('Модуль успешно создан');
        } else {
            Storage.editModuleByID(num, name, points);
            closeModal();
            infoModuleModal('Изменения модуля успешно сохранены');
        }
        addTable('modules');
        uncheckAll();
    }
};

const infoModuleModal = (info) => {
    const modal = <div className='modal'>
        <div className='background' onClick={ e => closeModal(e) }>
        </div>
        <div className='window'>
            <div className='close' onClick={ e => closeModal(e) }>
                <img src={closeModalIcon}/>
            </div>
            <div className='title_info'>
                {info}
            </div>
            <a>
                <input type='submit' className='standard_btn blue_bg' value='Ок' onClick={ e => closeModal(e) }/>
            </a>
        </div>
    </div>;

    render(modal, document.getElementById('modal'));
};