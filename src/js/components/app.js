import {h, Component, render, Fragment} from 'preact';
import { Router, route } from 'preact-router';

import {Provider} from 'redux-zero/react';

import store from '../utils/store';
import ModulesPage from './modulesPage';
import LessonsPage from './lessonsPage';
import LessonPage from './lessonPage';
import HomeworkPage from './homeworkPage';

import EditPanel from './editPanel'
import NewModuleModal from "./modals/newModule";
import NewLessonModal from "./modals/newLesson";
import NewHomeworkModal from "./modals/newHomework";
import NewMarkModal from "./modals/newMark";
import InfoModal from "./modals/info";
import ChoiceModal from "./modals/choice";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div id='modal'>
                    <NewModuleModal/>
                    <NewLessonModal/>
                    <NewHomeworkModal/>
                    <NewMarkModal/>
                    <InfoModal/>
                    <ChoiceModal/>
                </div>
                <div className='page'>
                    <div className='page_content' id='content'>
                        <Router>
                        <ModulesPage path="/"/>
                        <LessonsPage path="/module/:moduleID"/>
                        <LessonPage path="/module/:moduleID/lesson/:lessonID"/>
                        <HomeworkPage path="/homework/:homeworkID"/>
                        <div default>Error 404
                            </div>
                        </Router>
                    </div>
                </div>
                <div id='edit_panel'>
                    <EditPanel/>
                </div>
            </Provider>
        );
    }
}