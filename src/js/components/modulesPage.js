import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import Top from './top';
import Table from './table';

class modulesPage extends Component {
    constructor(props) {
        super();
        props.initTableData('modules');
    }

    render() {
        return (
            <Fragment>
                <div className='top_block' id='top_block'>
                    <Top type='modules'/>
                </div>
                <div id='table_block'>
                    <Table type='modules'/>
                </div>
            </Fragment>
        );
    }
}

export default connect(null, actions)(modulesPage);
