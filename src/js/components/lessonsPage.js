import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import Top from './top';
import Table from './table';

class lessonsPage extends Component {
    constructor(props) {
        super();
        props.initTableData('lessons', {
            moduleID: props.moduleID
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

export default connect(null, actions)(lessonsPage);
