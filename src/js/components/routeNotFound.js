import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import { Router, route } from 'preact-router';

import actions from '../actions/actions';
import { routerUrl } from "../utils/data";

class routeNotFound extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        route(routerUrl + '404', true);
    }
}

export default connect(null, actions)(routeNotFound);
