import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal}) => ({modal});

class ChoiceModal extends Component {
    render() {
        const modal = this.props.modal.choiceModal;
        return modal.isOpen && <div className='modal'>
            <div className='background' onClick={() => this.props.closeModal('choiceModal')}>
            </div>
            <div className='window'>
                <div className='close' onClick={() => this.props.closeModal('choiceModal')}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title'>
                    {modal.text}
                </div>
                {modal.add_text ? <div className='center err'>{modal.add_text}</div> : ''}
                <div className='choice'>
                    <input type='submit' className='standard_btn blue_bg' value='Да'
                           onClick={e => this.props[modal.onClickYes](e)}/>
                    <input type='submit' className='standard_btn blue_bg' value='Нет'
                           onClick={() => this.props.closeModal('choiceModal')}/>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(ChoiceModal);