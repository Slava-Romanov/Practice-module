import {h, Component, render, Fragment} from 'preact';
import {Link} from 'preact-router/match';
import {connect} from "redux-zero/preact";
import actions from "../../actions/actions";
import Storage, {routerUrl} from "../../utils/data";

import LinkReplace from "./linkReplace"

const mapToProps = ({type, page}) => ({type, page});

class navigation extends Component {
    constructor() {
        super();
    }

    render() {
        switch (this.props.type) {
            // case 'modules':
            //     return <Fragment>
            //         <div className='navigation'>
            //             <LinkReplace href={routerUrl}>
            //                 Выбор модуля
            //             </LinkReplace>
            //         </div>
            //     </Fragment>;
            case 'lessons':
                return <Fragment>
                    <div className='navigation'>
                        <Link href={routerUrl}>
                            Модули
                        </Link>/
                        <LinkReplace href={routerUrl + 'module/' + this.props.page.moduleID}>
                            {Storage.getModuleByID(this.props.page.moduleID).name}
                        </LinkReplace>
                    </div>
                </Fragment>;
            case 'lesson':
                return <Fragment>
                    <div className='navigation'>
                        <Link href={routerUrl}>
                            Модули
                        </Link>/
                        <Link href={routerUrl + 'module/' + this.props.page.moduleID}>
                            {Storage.getModuleByID(this.props.page.moduleID).name}
                        </Link>/
                        <LinkReplace href={routerUrl + 'module/' + this.props.page.moduleID
                            + '/lesson/' + this.props.page.lessonID}>
                            {Storage.getLessonByID(this.props.page.moduleID,  this.props.page.lessonID).name}
                        </LinkReplace>
                    </div>
                </Fragment>;
            case 'homework':
                const homework = Storage.getHomeworkByID(this.props.page.homeworkID);
                const hw_start_module = Number(homework.start.split('_')[0]);
                //const hw_start_lesson = Number(homework.start.split('_')[1]);
                // <LinkReplace href={routerUrl + 'module/' + hw_start_module
                // + '/lesson/' + hw_start_lesson}>
                //     {Storage.getLessonByID(hw_start_module,  hw_start_lesson).name}
                // </LinkReplace>/
                return <Fragment>
                    <div className='navigation'>
                        <Link href={routerUrl}>
                            Модули
                        </Link>/
                        <Link href={routerUrl + 'module/' + hw_start_module}>
                            {Storage.getModuleByID(hw_start_module).name}
                        </Link>/
                        <LinkReplace href={routerUrl + 'homework/' + this.props.page.homeworkID}>
                            {Storage.getHomeworkByID(this.props.page.homeworkID).name}
                        </LinkReplace>
                    </div>
                </Fragment>;
            default:
                return '';
        }
    }
}

export default connect(mapToProps, actions)(navigation);