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
                <input type='text' id='nameModal' onInput={e => this.props.onInputNewMarkModal(e)} required
                           placeholder='Комментарий'
                           value={modal.nameModal}>
                </input>
                {modal.textErrName ? <div className='err'>{modal.textErrName}</div> : ''}
                <input type='text' id='pointsModal' onInput={e => this.props.onInputNewMarkModal(e)} required
                           placeholder='Количество баллов'
                           value={modal.pointsModal}>
                </input>
                {modal.textErrPoints ? <div className='err'>{modal.textErrPoints}</div> : ''}
                <a>
                    <input type='submit' className='standard_btn blue_bg'
                           value={this.btn} onClick={e => this.props.addMark(e, modal.num)}>
                    </input>
                </a>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(NewMarkModal);