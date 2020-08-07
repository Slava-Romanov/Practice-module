import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import Top from './top';
import Table from './table';

class lessonPage extends Component {
    constructor(props) {
        super();
        props.initTableData('lesson', {
            homeworkID: null, moduleID: props.moduleID, lessonID: props.lessonID
        });
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
