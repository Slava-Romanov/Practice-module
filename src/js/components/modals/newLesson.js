import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";
import LineSelect from "../elements/lineSelect";
import Storage from "../../utils/data";

const mapToProps = ({modal, selectOpen}) => ({modal, selectOpen});

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
            <div className='window' onMouseUp={(e) => this.props.clickOutNewLessonModal(e)}>
                <div className='close' onClick={(e) => this.props.closeModal('newLessonModal')}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {this.title}
                </div>

                <div className='inputElement'>
                    <input type='text' id='nameModal' className={`line inputFocus inputPlaceholder
                        ${modal.nameModalErr ? ' errorLine' : ''}`}
                           onfocusout={e => this.props.onInputNewLessonModal(e)}
                           onInput={e => this.props.onInputNewLessonModal(e)} required
                           placeholder='Название занятия' value={modal.nameModal}/>
                    <label>Название занятия</label>
                    {modal.nameModalErr ? <div className='err'>{modal.nameModalErr}</div> : ''}
                </div>

                <div className='inputElement' id='typeModalLine'>
                    <input type='text' id='typeModal' className={`line inputPlaceholder
                        ${this.props.selectOpen === 'typeModalSelect'? ' selectedLine' : ''}
                        ${modal.typeModalErr ? ' errorLine' : ''}`}
                           onfocusin={e => this.props.onInputSelectModal(e, this.modalID)}
                           onInput={e => this.props.onInputSelectModal(e, this.modalID)} required
                           placeholder='Тип занятия' value={modal.typeModal} readonly/>
                    <label>Тип занятия</label>
                    <LineSelect inputID='typeModal' modalID={this.modalID} notFill='false' children={Storage.getTypesNums()}/>
                    {modal.typeModalErr ? <div className='err'>{modal.typeModalErr}</div> : ''}
                </div>

                <div className='inputElement'>
                    <textarea id="descModal" className="line_area inputFocus inputPlaceholder"
                          onInput={e => this.props.onInputNewLessonModal(e)} value={modal.descModal}
                          placeholder="Описание занятия (необязательно)" maxLength="512" rows="14" cols="33"/>
                    <label>Описание занятия</label>
                </div>

                <input type='submit' className='standard_btn blue_bg'
                       value={this.btn} onClick={e => this.props.addLesson(e, modal.num)}/>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewLessonModal);