import { addTopBlock } from '../Top/top';
import { addTable } from '../Table/table';

export const createPageModules = () => {
    addTopBlock('modules');
    addTable('modules');
};