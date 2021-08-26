import {h, Component, render, Fragment} from 'preact';
import {Link} from 'preact-router/match';
import {connect} from "redux-zero/preact";
import actions from "../../actions/actions";
import {routerUrl} from "../../utils/data";

const mapToProps = ({type, page}) => ({type, page});

class linkReplace extends Component {
    constructor() {
        super();
    }

    clickLink(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    render(props) {
        return <Fragment>
            <a href={props.href} onClick={this.clickLink}>
                {props.children}
            </a>
        </Fragment>;
    }
}

export default connect(null, actions)(linkReplace);