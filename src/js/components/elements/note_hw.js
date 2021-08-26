import {h, Component, render, Fragment} from 'preact';
import {connect} from "redux-zero/preact";

class note_hw extends Component {
    constructor() {
        super();
    }

    render() {
        return <Fragment>
            <span className='notes'>
                <div className='note'><div className='light-blue'></div> — занятие выдачи дз</div>
                <div className='note'><div className='blue'></div> — занятие сдачи дз</div>
            </span>
        </Fragment>;
    }
}

export default connect(null, null)(note_hw);