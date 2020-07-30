import {h, Component, render, Fragment} from 'preact';
import {Provider} from 'redux-zero/react';

import store from '../utils/store';
import ModulesPage from './modulesPage';
import EditPanel from './editPanel'
import NewModuleModal from "./modals/newModule";
import InfoModal from "./modals/info";
import ChoiceModal from "./modals/choice";


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div id='modal'>
                    <NewModuleModal/>
                    <InfoModal/>
                    <ChoiceModal/>
                </div>
                <div className='page'>
                    <div className='page_content' id='content'>
                        <ModulesPage/>
                    </div>
                </div>
                <div id='edit_panel'>
                    <EditPanel type='modules'/>
                </div>
            </Provider>
        );
    }
}