import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import Storage from '../../utils/data';

import actions from '../../actions/actions';
import LineSelect from "../elements/lineSelect"

import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal}) => ({modal});

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
            <div className='window' onClick={(e) => this.props.clickOutNewHomeworkModal(e)}>
                <div className='close' onClick={(e) => this.props.closeModal(this.modalID)}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {this.title}
                </div>
                <input type='text' id='nameModal' className='line' onInput={e => this.props.onInputNewHomeworkModal(e)} required
                       placeholder='Название домашнего задания' value={modal.nameModal}/>
                <div>{modal.nameModalErr ? <div className='err'>{modal.nameModalErr}</div>: ''}</div>

                <div className='blockLine' id='startModalLine'>
                    <input type='text' className='line' id='startModal'
                           onfocusin={e => this.props.onInputSelectModal(e, this.modalID)}
                           onInput={e => this.props.onInputSelectModal(e, this.modalID)} required
                           placeholder='Занятие выдачи' value={modal.startModal}/>
                    <LineSelect inputID='startModal' modalID={this.modalID} children={Storage.getLessonsNums(modal.startModal)}/>
                </div>
                {modal.startModalErr ? <div className='err'>{modal.startModalErr}</div> : ''}

                <div className='blockLine' id='endModalLine'>
                    <input type='text' className='line' id='endModal'
                           onfocusin={e => this.props.onInputSelectModal(e, this.modalID)}
                        onInput={e => this.props.onInputSelectModal(e, this.modalID)} required
                           placeholder='Занятие сдачи' value={modal.endModal}/>
                    <LineSelect inputID='endModal' modalID={this.modalID} children={Storage.getLessonsNums(modal.endModal)}/>
                </div>
                {modal.endModalErr ? <div className='err'>{modal.endModalErr}</div> : ''}

                <input type='text' id='dateModal' className='line' onInput={e => this.props.onInputNewHomeworkModal(e)} required
                       placeholder='Крайний срок сдачи' value={modal.dateModal}/>
                {modal.textErrDate ? <div className='err'>{modal.textErrDate}</div> : ''}

                <textarea id="descModal" className='line_area' onInput={e => this.props.onInputNewHomeworkModal(e)}
                              value={modal.descModal}
                              placeholder="Описание домашнего занятия (необязательно)" maxLength="512" rows="14"
                              cols="33"/>

                <a>
                    <input type='submit' className='standard_btn blue_bg'
                           value={this.btn} onClick={e => this.props.addHomework(e, modal.num)}>
                    </input>
                </a>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewHomeworkModal);