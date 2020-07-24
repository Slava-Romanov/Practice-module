import { addTopBlock } from '../Top/top';
import {addTable } from '../Table/table';
import Storage from './../../utils/store'

export const createPageModules = () => {
    addTopBlock('modules');
    const elements = Storage.generateSelection('modules', '');
    addTable(elements, 'modules', 'Таблица модулей дисциплины');
};