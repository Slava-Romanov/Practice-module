import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import Storage from '../../utils/data';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal}) => ({modal});

class NewHomeworkModal extends Component {
    constructor(props) {
        super();
        this.title = '';
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

    render() {
        const modal = this.props.modal.newHomeworkModal;
        this.initType(modal);
        return modal.isOpen && <div className='modal'>
            <div className='background' onClick={() => this.props.closeModal('newHomeworkModal')}>
            </div>
            <div className='window'>
                <div className='close' onClick={(e) => this.props.closeModal('newHomeworkModal')}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {this.title}
                </div>
                <div className='line'>
                    <input type='text' id='nameModal' onInput={e => this.props.onInputNewHomeworkModal(e)} required
                           placeholder='Название домашнего задания'
                           value={modal.nameModal}>
                    </input>
                </div>
                {modal.textErrName ? <div className='err'>{modal.textErrName}</div> : ''}
                <div className='line'>
                    <select id='startModal' value={modal.startModal} required
                            onChange={e => this.props.onInputNewHomeworkModal(e)}>
                        <option selected disabled>Занятие выдачи</option>
                        {
                            Storage.getLessonsNums().map((el, index) => (
                                <option value={el.num}>{el.name}</option>
                            ))
                        }
                    </select>
                </div>
                {modal.textErrStart ? <div className='err'>{modal.textErrStart}</div> : ''}
                <div className='line'>
                    <select id='endModal' value={modal.endModal} required
                            onChange={e => this.props.onInputNewHomeworkModal(e)}>
                        <option selected disabled>Занятие сдачи</option>
                        {
                            Storage.getLessonsNums().map((el, index) => (
                                <option value={el.num}>{el.name}</option>
                            ))
                        }
                    </select>
                </div>
                {modal.textErrEnd ? <div className='err'>{modal.textErrEnd}</div> : ''}

                <div className='line'>
                    <input type='text' id='dateModal' onInput={e => this.props.onInputNewHomeworkModal(e)} required
                           placeholder='Крайний срок сдачи'
                           value={modal.dateModal}>
                    </input>
                </div>
                {modal.textErrDate ? <div className='err'>{modal.textErrDate}</div> : ''}

                <div className='line_area'>
                    <textarea id="descModal" onInput={e => this.props.onInputNewHomeworkModal(e)}
                              value={modal.descModal}
                              placeholder="Описание домашнего занятия (необязательно)" maxLength="512" rows="14"
                              cols="33"/>
                </div>

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