import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";
import LineSelect from "../elements/lineSelect";
import Storage from "../../utils/data";

const mapToProps = ({modal}) => ({modal});

class NewLessonModal extends Component {
    constructor(props) {
        super();
        this.title = '';
        this.modalID = 'newLessonModal';
    }

    initType(props) {
        if (props.num != null) {
            this.title = 'Редактирование занятия';
            this.btn = 'Сохранить';
        } else {
            this.title = 'Создание нового занятия';
            this.btn = 'Создать';
        }
    }

    render() {
        const modal = this.props.modal.newLessonModal;
        this.initType(modal);
        return modal.isOpen && <div className='modal'>
            <div className='background' onClick={() => this.props.closeModal('newLessonModal')}>
            </div>
            <div className='window'>
                <div className='close' onClick={(e) => this.props.closeModal('newLessonModal')}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {this.title}
                </div>
                <input type='text' className='line' id='nameModal' onInput={e => this.props.onInputNewLessonModal(e)} required
                           placeholder='Название занятия'
                           value={modal.nameModal}>
                </input>
                {modal.textErrName ? <div className='err'>{modal.textErrName}</div> : ''}
                <div className='blockLine' id='typeModalLine'>
                    <input type='text' className='line' id='typeModal'
                           onfocusin={e => this.props.onInputSelectModal(e, this.modalID)}
                           onInput={e => this.props.onInputSelectModal(e, this.modalID)} required
                           placeholder='Тип занятия' value={modal.typeModal} readonly/>
                    <LineSelect inputID='typeModal' modalID={this.modalID} children={Storage.getTypesNums()}/>
                </div>
                {modal.textErrType ? <div className='err'>{modal.textErrType}</div> : ''}
                <textarea id="descModal" className="line_area" onInput={e => this.props.onInputNewLessonModal(e)} value={modal.descModal}
                          placeholder="Описание занятия (необязательно)" maxLength="512" rows="14" cols="33"/>
                <a>
                    <input type='submit' className='standard_btn blue_bg'
                           value={this.btn} onClick={e => this.props.addLesson(e, modal.num)}>
                    </input>
                </a>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewLessonModal);