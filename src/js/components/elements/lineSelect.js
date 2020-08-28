import {h, Component, render, Fragment} from 'preact';
import {connect} from "redux-zero/preact";
import actions from "../../actions/actions";
import {Table} from "../table"


const mapToProps = ({modal, selectOpen}) => ({modal, selectOpen});

class lineSelect extends Component {
    constructor(props) {
        super();
        this.inputID = props.inputID;
        this.selectID = props.inputID + 'Select';
        this.modalID = props.modalID;
        this.notFill = props.notFill;
    }

    render(props) {
        //const select = props.modal[this.modalID][this.selectID];//select.isOpen
        return props.selectOpen === this.selectID && <Fragment>
            <div className='selectWindow' id={this.selectID}>
                {
                    props.children.length !== 0? props.children.map((el) => (
                        <div className='element' onClick={() => this.props.chooseSelect(this.modalID, this.inputID, el.num, el.name)}>
                            <div className='text'>
                                {this.notFill? el.name:Table.fillSearch(el.name, props.modal[props.modalID][this.inputID])}
                            </div>
                        </div>
                    )):<div className='notFound'>Ничего не найдено</div>
                }
            </div>
        </Fragment>;
    }
}

export default connect(mapToProps, actions)(lineSelect);