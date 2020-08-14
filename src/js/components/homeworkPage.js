import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import Top from './top';
import Table from './table';
import Storage, {routerUrl} from "../utils/data";
import {route} from "preact-router";

class homeworkPage extends Component {
    constructor(props) {
        super();
        if (!Number.isInteger(Number(props.homeworkID)) || props.homeworkID >= Storage.getHomeworks().length) {
            route(routerUrl + '404', true);
        } else {
            props.initTableData('homework', {
                homeworkID: props.homeworkID
            });
            document.title = 'ДЗ: ' + Storage.getHomeworkByID(props.homeworkID).name;
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

export default connect(null, actions)(homeworkPage);
