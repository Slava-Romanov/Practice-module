import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

class notFoundPage extends Component {
    constructor(props) {
        super();
        props.initError();
    }

    componentDidMount() {
        document.title = 'Страница не найдена';
    }

    render() {
        return (
            <Fragment>
                <div className='middleBlock'>
                    <div className='errorMessage'>
                        <div className='num'>
                             404
                        </div>
                        Страница не найдена
                        <div className='back' onClick={() => window.history.back()}>
                            Назад
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(null, actions)(notFoundPage);
