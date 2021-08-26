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

                <div className='inputElement'>
                    <input type='text' id='nameModal' className={`line inputFocus inputPlaceholder
                        ${modal.nameModalErr ? ' errorLine' : ''}`}
                           onfocusout={e => this.props.onInputNewModuleModal(e)}
                           onInput={e => this.props.onInputNewModuleModal(e)} required
                           placeholder='Название модуля' value={modal.nameModal}/>
                    {modal.nameModalErr ? <div className='err'>{modal.nameModalErr}</div>: ''}
                    <label>Название домашнего задания</label>
                </div>

                <div className='inputElement'>
                    <input type='text' id='pointsModal' className={`line inputFocus inputPlaceholder
                        ${modal.pointsModalErr ? ' errorLine' : ''}`}
                           onfocusout={e => this.props.onInputNewModuleModal(e)}
                           onInput={e => this.props.onInputNewModuleModal(e)} required
                           placeholder='Максимальное количество баллов' value={modal.pointsModal}/>
                    {modal.pointsModalErr ? <div className='err'>{modal.pointsModalErr}</div>: ''}
                    <label>Максимальное количество баллов</label>
                </div>

                <input type='submit' className='standard_btn blue_bg'
                       value={this.btn} onClick={e => this.props.addModule(e, modal.num)}/>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewModuleModal);