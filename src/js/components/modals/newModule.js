import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal}) => ({modal});

class NewModuleModal extends Component {
    constructor(props) {
        super();
        this.title = '';
    }

    initType(props) {
        if (props.num != null) {
            this.title = 'Редактирование модуля';
            this.btn = 'Сохранить';
        } else {
            this.title = 'Создание нового модуля';
            this.btn = 'Создать';
        }
    }

    render() {
        const modal = this.props.modal.newModuleModal;
        this.initType(modal);
        return modal.isOpen && <div className='modal'>
            <div className='background' onClick={() => this.props.closeModal('newModuleModal')}>
            </div>
            <div className='window'>
                <div className='close' onClick={(e) => this.props.closeModal('newModuleModal')}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {this.title}
                </div>
                <input className='line' type='text' id='nameModal' onInput={e => this.props.onInputNewModuleModal(e)} required
                       placeholder='Название модуля' value={modal.nameModal}>
                </input>
                {modal.textErrName ? <div className='err'>{modal.textErrName}</div> : ''}
                <input className='line' type='text' id='pointsModal' onInput={e => this.props.onInputNewModuleModal(e)} required
                           placeholder='Максимальное количество баллов'
                           value={modal.pointsModal}>
                </input>
                {modal.textErrPoints ? <div className='err'>{modal.textErrPoints}</div> : ''}
                <a>
                    <input type='submit' className='standard_btn blue_bg'
                           value={this.btn} onClick={e => this.props.addModule(e, modal.num)}>
                    </input>
                </a>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewModuleModal);