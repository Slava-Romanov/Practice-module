import {h, Component, render, Fragment} from 'preact';
import {connect} from "redux-zero/preact";
import actions from "../../actions/actions";
import {Table} from "../table"


const mapToProps = ({modal}) => ({modal});

class lineSelect extends Component {
    constructor(props) {
        super();
        this.inputID = props.inputID;
        this.selectID = props.inputID + 'Select';
        this.modalID = props.modalID;
    }

    render(props) {
        const select = props.modal[this.modalID][this.selectID];
        return select && select.isOpen && <Fragment>
            <div className='selectWindow'>
                {
                    props.children.length !== 0? props.children.map((el) => (
                        <div className='element' onClick={() => this.props.chooseSelect(this.modalID, this.inputID, el.num)}>
                            <div className='text'>
                                {Table.fillSearch(el.name, props.modal[props.modalID][this.inputID])}
                            </div>
                        </div>
                    )):<div className='notFound'>Ничего не найдено</div>
                }
            </div>
        </Fragment>;
    }
}

export default connect(mapToProps, actions)(lineSelect);