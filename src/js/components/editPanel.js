import {h, Component, render, Fragment} from 'preact';
import {connect} from "redux-zero/preact";

import actions from "../actions/actions";

import closeIcon from "../../images/panel/closeIcon.svg";
import upIcon from "../../images/panel/upIcon.svg";
import downIcon from "../../images/panel/downIcon.svg";
import penIcon from "../../images/panel/penIcon.svg";
import trashIcon from "../../images/panel/trashIcon.svg";

const mapToProps = ({type, editPanel}) => ({type, editPanel});

class EditPanel extends Component {
    constructor() {
        super();
    }

    render(props) {
        return this.props.editPanel.isOpen && <Fragment>
            <div className='edit_panel_p'>
            <div className='edit_panel'>
                <button className='ep_btn grey_bg' onClick={() => this.props.removeSelection()}>
                    <img src={closeIcon}/>Снять выделение
                </button>
                <button className='ep_btn grey_bg' id='UpEP' onClick={() => this.props.moveUp(this.props.type)}
                        disabled={this.props.editPanel.moveUpBool}>
                    <img src={upIcon}/> Переместить выше
                </button>
                <button className='ep_btn grey_bg' id='DownEP' onClick={() => this.props.moveDown(this.props.type)}
                        disabled={this.props.editPanel.moveDownBool}>
                    <img src={downIcon}/> Переместить ниже
                </button>
                <button className='ep_btn grey_bg' id='EditEP' onClick={() => this.props.editCheck(this.props.type)}
                        disabled={this.props.editPanel.isEditBool}>
                    <img src={penIcon}/> Редактировать
                </button>
                <button className='ep_btn red_bg' onClick={() => this.props.deleteElementModal(this.props.type)}>
                    <img src={trashIcon}/> Удалить
                </button>
            </div>
            </div>
        </Fragment>;
    }
}

export default connect(mapToProps, actions)(EditPanel);