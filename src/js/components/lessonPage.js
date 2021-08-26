import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import Top from './top';
import Table from './table';
import Storage, {routerUrl} from "../utils/data";
import {route} from "preact-router";

class lessonPage extends Component {
    constructor(props) {
        super();
        if (!Number.isInteger(Number(props.moduleID)) || !Number.isInteger(Number(props.lessonID)) ||
            props.moduleID >= Storage.getModules().length ||
            props.lessonID >= Storage.getLessonsByID(props.moduleID).length) {
            route(routerUrl + '404', true);
        } else {
            props.initTableData('lesson', {
                homeworkID: null, moduleID: props.moduleID, lessonID: props.lessonID
            });
            document.title = 'Занятие: ' + Storage.getLessonByID(props.moduleID, props.lessonID).name;
        }
    }

    render() {
        return (
            <Fragment>
                <div className='top_block' id='top_block'>
                    <Top/>
                </div>
                <div id='table_block'>
                    <Table/>
                </div>
            </Fragment>
        );
    }
}

export default connect(null, actions)(lessonPage);
