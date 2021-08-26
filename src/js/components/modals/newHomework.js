import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import Storage from '../../utils/data';

import actions from '../../actions/actions';
import LineSelect from "../elements/lineSelect"

import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal, selectOpen}) => ({modal, selectOpen});

class NewHomeworkModal extends Component {
    constructor(props) {
        super();
        this.title = '';
        this.modalID = 'newHomeworkModal';
    }

    initType(props) {
        if (props.num != null) {
            this.title = 'Редактирование домашнего задания';
            this.btn = 'Сохранить';
        } else {
            this.title = 'Создание нового домашнего задания';
            this.btn = 'Создать';
        }
    }

    // <select id='endModal' value={modal.endModal} required
    // onChange={e => this.props.onInputNewHomeworkModal(e)}>
    // <option selected disabled>Занятие сдачи</option>
    // {
    //     Storage.getLessonsNums().map((el, index) => (
    //         <option value={el.num}>{el.name}</option>
    //     ))
    // }
    // </select>

    render() {
        const modal = this.props.modal.newHomeworkModal;
        this.initType(modal);
        return modal.isOpen && <div className='modal'>
            <div className='background' onClick={() => this.props.closeModal(this.modalID)}>
            </div>
            <div className='window' onMouseUp={(e) => this.props.clickOutNewHomeworkModal(e)}>
                <div className='close' onClick={(e) => this.props.closeModal(this.modalID)}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {this.title}
                </div>

                <div className='inputElement'>
                    <input type='text' id='nameModal' className={`line inputFocus inputPlaceholder
                        ${modal.nameModalErr ? ' errorLine' : ''}`}
                           onfocusout={e => this.props.onInputNewHomeworkModal(e)}
                           onInput={e => this.props.onInputNewHomeworkModal(e)} required
                           placeholder='Название домашнего задания' value={modal.nameModal}/>
                    {modal.nameModalErr ? <div className='err'>{modal.nameModalErr}</div>: ''}
                    <label>Название домашнего задания</label>
                </div>

                <div className='inputElement' id='startModalLine'>
                    <input type='text' className={`line inputFocus inputPlaceholder
                        ${this.props.selectOpen === 'startModalSelect'? ' selectedLine' : ''}
                        ${modal.startModalErr ? ' errorLine' : ''}`}
                        id='startModal'
                        onfocusin={e => this.props.onInputSelectModal(e, this.modalID)}
                        onInput={e => this.props.onInputSelectModal(e, this.modalID)} required
                        placeholder='Занятие выдачи' value={modal.startModal}/>
                    <LineSelect inputID='startModal' modalID={this.modalID} children={Storage.getLessonsNums(modal.startModal)}/>
                    {modal.startModalErr ? <div className='err'>{modal.startModalErr}</div> : ''}
                    <label>Занятие выдачи</label>
                </div>

                <div className='inputElement' id='endModalLine'>
                    <input type='text' className={`line inputFocus inputPlaceholder
                        ${this.props.selectOpen === 'endModalSelect'? ' selectedLine' : ''}
                        ${modal.endModalErr ? ' errorLine' : ''}`}
                           id='endModal'
                           onfocusin={e => this.props.onInputSelectModal(e, this.modalID)}
                        onInput={e => this.props.onInputSelectModal(e, this.modalID)} required
                           placeholder='Занятие сдачи' value={modal.endModal}/>
                    <LineSelect inputID='endModal' modalID={this.modalID} children={Storage.getLessonsNums(modal.endModal)}/>
                    {modal.endModalErr ? <div className='err'>{modal.endModalErr}</div> : ''}
                    <label>Занятие cдачи</label>
                </div>

                <div className='inputElement'>
                    <input type='text' id='dateModal'
                           className={`line inputFocus inputPlaceholder
                        ${modal.dateModalErr ? ' errorLine' : ''}`}
                           onfocusout={e => this.props.onInputNewHomeworkModal(e)}
                           onInput={e => this.props.onInputNewHomeworkModal(e)} required
                        placeholder='Крайний срок сдачи' value={modal.dateModal}/>
                    {modal.dateModalErr ? <div className='err'>{modal.dateModalErr}</div> : ''}
                    <label>Крайний срок сдачи</label>
                </div>

                <div className='inputElement'>
                    <textarea id="descModal" className='line_area inputFocus inputPlaceholder'
                              onInput={e => this.props.onInputNewHomeworkModal(e)}
                              value={modal.descModal}
                              placeholder="Описание домашнего занятия (необязательно)" maxLength="512" rows="14" cols="33"/>
                    <label>Описание домашнего занятия</label>
                </div>

                <input type='submit' className='standard_btn blue_bg'
                       value={this.btn} onClick={e => this.props.addHomework(e, modal.num)}/>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewHomeworkModal);