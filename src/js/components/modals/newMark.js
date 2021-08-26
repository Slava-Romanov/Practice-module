import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal}) => ({modal});

class NewMarkModal extends Component {
    constructor(props) {
        super();
        this.title = '';
    }

    initType(props) {
        if (props.num != null) {
            this.title = 'Редактирование оценки';
            this.btn = 'Сохранить';
        } else {
            this.title = 'Добавление новой оценки';
            this.btn = 'Создать';
        }
    }

    render() {
        const modal = this.props.modal.newMarkModal;
        this.initType(modal);
        return modal.isOpen && <div className='modal'>
            <div className='background' onClick={() => this.props.closeModal('newMarkModal')}>
            </div>
            <div className='window'>
                <div className='close' onClick={(e) => this.props.closeModal('newMarkModal')}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {this.title}
                </div>

                <div className='inputElement'>
                    <input type='text' id='nameModal' className={`line inputFocus inputPlaceholder
                        ${modal.nameModalErr ? ' errorLine' : ''}`}
                           onfocusout={e => this.props.onInputNewMarkModal(e)}
                           onInput={e => this.props.onInputNewMarkModal(e)} required
                           placeholder='Комментарий' value={modal.nameModal}/>
                    {modal.nameModalErr ? <div className='err'>{modal.nameModalErr}</div> : ''}
                    <label>Комментарий</label>
                </div>

                <div className='inputElement'>
                    <input type='text' id='pointsModal' className={`line inputFocus inputPlaceholder
                        ${modal.pointsModalErr ? ' errorLine' : ''}`}
                           onfocusout={e => this.props.onInputNewMarkModal(e)}
                           onInput={e => this.props.onInputNewMarkModal(e)} required
                           placeholder='Количество баллов' value={modal.pointsModal}/>
                    {modal.pointsModalErr ? <div className='err'>{modal.pointsModalErr}</div> : ''}
                    <label>Количество баллов</label>
                </div>

                <input type='submit' className='standard_btn blue_bg'
                       value={this.btn} onClick={e => this.props.addMark(e, modal.num)}/>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewMarkModal);