import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import findIcon from '../../images/findIcon.svg';

const mapToProps = ({searchText}) => ({searchText});

class Top extends Component {
    constructor() {
        super();
        this.newLabel = '';
        this.newElementModal = null;
    }

    initType(type) {
        switch (type) {
            case 'modules':
                this.newLabel = '+Новый модуль';
                this.newElementModal = this.props.newModuleModal;
                break;
            case 'lessons':
                break;
            case 'homeworks':
                break;
        }
    }

    render(props) {
        this.initType(this.props.type);
        return <Fragment>
            <div className='search'>
                <img src={findIcon}/>
                <input className='search_input' id='search_main_input' type='text'
                       onInput={e => this.props.searchUpdate(e, this.props.type)} value={this.props.searchText}>
                </input>
            </div>
            <button className='top_btn blue_bg' onClick={() => this.newElementModal()}> {this.newLabel} </button>
        </Fragment>;
    }
}

export default connect(mapToProps, actions)(Top);