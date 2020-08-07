import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal}) => ({modal});

class NewLessonModal extends Component {
    constructor(props) {
        super();
        this.title = '';
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
                <div className='line'>
                    <input type='text' id='nameModal' onInput={e => this.props.onInputNewLessonModal(e)} required
                           placeholder='Название занятия'
                           value={modal.nameModal}>
                    </input>
                </div>
                {modal.textErrName ? <div className='err'>{modal.textErrName}</div> : ''}
                <div className='line'>
                    <select id='typeModal' value={modal.typeModal} required
                            onChange={e => this.props.onInputNewLessonModal(e)}>
                        <option selected disabled>Тип занятия</option>
                        <option value='lec'>Лекция</option>
                        <option value='sem'>Семинар</option>
                        <option value='rk'>Рубежный контроль</option>
                        <option value='ex'>Экзамен</option>
                    </select>
                </div>
                {modal.textErrType ? <div className='err'>{modal.textErrType}</div> : ''}
                <div className='line_area'>
                    <textarea id="descModal" onInput={e => this.props.onInputNewLessonModal(e)} value={modal.descModal}
                              placeholder="Описание занятия (необязательно)" maxLength="512" rows="14" cols="33"/>
                </div>
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