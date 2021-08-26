import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../../actions/actions';
import closeModalIcon from "../../../images/closeModalIcon.svg";

const mapToProps = ({modal}) => ({modal});

class InfoModal extends Component {
    render() {
        const modal = this.props.modal.infoModal;
        return modal.isOpen && <div className='modal'>
            <div className='background' onClick={() => this.props.closeModal('infoModal')}>
            </div>
            <div className='window'>
                <div className='close' onClick={(e) => this.props.closeModal('infoModal')}>
                    <img src={closeModalIcon}/>
                </div>
                <div className='title_info'>
                    {modal.info}
                </div>
                <a>
                    <input type='submit' className='standard_btn blue_bg' value='Ок'
                           onClick={() => this.props.closeModal('infoModal')}/>
                </a>
            </div>
        </div>;
    }
}

export default connect(mapToProps, actions)(InfoModal);