import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';
import { Link } from 'preact-router/match';

import actions from '../actions/actions';
import Storage from '../utils/data'

import findIcon from '../../images/top/findIcon.svg';
import editIcon from "../../images/penIcon.svg";
import trashIcon from "../../images/trashIcon.svg";
import Note_hw from "./elements/note_hw";

const mapToProps = ({type, page, searchText}) => ({type, page, searchText});

class Top extends Component {
    constructor(props) {
        super();
        this.newLabel = '';
        this.newElementModal = null;
        this.initType(props);
    }

    initType(props) {
        switch (props.type) {
            case 'lesson':
                this.lesson = Storage.getLessonByID(props.page.moduleID, props.page.lessonID);
                break;
            case 'homework':
                this.homework = Storage.getHomeworkByID(props.page.homeworkID);
                this.hw_start_module = Number(this.homework.start.split('_')[0]);
                this.hw_end_module = Number(this.homework.end.split('_')[0]);
                this.hw_start_lesson = Number(this.homework.start.split('_')[1]);
                this.hw_end_lesson = Number(this.homework.end.split('_')[1]);
                this.date = new Date(this.homework.date);
                break;
        }
    }

    add (arr, adding) {
        for (let i = 1; i <= arr.length; i += 2) {
            arr.splice(i, 0, adding);
        }

        return arr;
    }

    render(props) {
        this.initType(this.props);
        switch (this.props.type) {
            case 'modules':
                return <Fragment>
                    <div className='top'>
                    <div className='search'>
                        <img src={findIcon}/>
                        <input className='search_input' id='search_main_input' type='text'
                               autocomplete='off' onInput={e => this.props.searchUpdate(e, this.props.type)}
                               value={this.props.searchText}>
                        </input>
                    </div>
                    <button className='top_btn blue_bg'
                            onClick={() => this.props.newModuleModal()}>+Новый модуль
                    </button>
                    </div>
                </Fragment>;
            case 'lessons':
                return <Fragment>
                    <div className='top'>
                    <div className='search'>
                        <img src={findIcon}/>
                        <input className='search_input' id='search_main_input' type='text'
                               autocomplete='off' onInput={e => this.props.searchUpdate(e, this.props.type)}
                               value={this.props.searchText}>
                        </input>
                    </div>
                    <button className='top_btn blue_bg'
                            onClick={() => this.props.newLessonModal()}>+Новое занятие
                    </button>
                    <button className='top_btn blue_bg'
                            onClick={() => this.props.newHomeworkModal()}>+ДЗ
                    </button>
                    </div>
                </Fragment>;
            case 'lesson':
                return <Fragment>
                    <div className='top' name='lesson_marks'>
                        <span className='title-top'>
                            {this.lesson.name}
                        </span>
                        <img src={editIcon} onClick={() => this.props.newLessonModal(this.props.page.lessonID)}/>
                        <img src={trashIcon} onClick={() => this.props.deleteOneLesson()}/>
                    <div className='btn-top'>
                    <button className='top_btn blue_bg'
                            onClick={() => this.props.newHomeworkModal()}>+ДЗ
                    </button>
                    <button className='top_btn blue_bg'
                            onClick={() => this.props.newMarkModal()}>+Оценка
                    </button>
                    </div>
                    </div>
                    <div className='labels'>
                        <div className={this.lesson.type}>
                            {Storage.typesHomeworkNames[this.lesson.type]}
                        </div>
                        {
                            Storage.getHomeworkByLessonID(this.props.page.lessonID, this.props.page.moduleID).map((el2) => (
                                el2.start_hw ?
                                    <Link activeClassName="active" href={"/homework/" + el2.num}>
                                        <div className='hw_s hw'>{el2.name}</div>
                                    </Link>
                                    :<Link activeClassName="active" href={"/homework/" + el2.num}>
                                        <div className='hw_e hw'>{el2.name}</div>
                                    </Link>
                            ))
                        }
                    </div>
                    <Note_hw/>
                    <div className='desc'>
                        {this.add(this.lesson.description.split('<br/>'), <br/>)}
                    </div>
                </Fragment>;
            case 'homework':
                return <Fragment>
                    <div className='top' name='homework_marks'>
                        <span className='title-top'>
                            {this.homework.name}
                        </span>
                        <img src={editIcon} onClick={() => this.props.newHomeworkModal(this.props.page.homeworkID)}/>
                        <img src={trashIcon} onClick={() => this.props.deleteOneHomework()}/>
                        <div className='btn-top'>
                            <button className='top_btn blue_bg'
                                    onClick={() => this.props.newMarkModal()}>+Оценка
                            </button>
                        </div>
                    </div>
                    <div className='labels'>
                        <Link activeClassName="active" href={"/module/" + this.hw_start_module + "/lesson/" + this.hw_start_lesson}>
                            <div className='hw_s hw'>{Storage.getLessonByID(this.hw_start_module, this.hw_start_lesson).name}</div>
                        </Link>
                        <Link activeClassName="active" href={"/module/" + this.hw_end_module + "/lesson/" + this.hw_end_lesson}>
                            <div className='hw_e hw'>{Storage.getLessonByID(this.hw_end_module, this.hw_end_lesson).name}</div>
                        </Link>
                    </div>
                    <Note_hw/>
                    <div className='date'>
                        Крайний срок сдачи: {(this.date.getDate() < 10 ? ('0' + this.date.getDate()):this.date.getDate()) + '.'
                        + (this.date.getMonth() < 9 ? ('0' + (this.date.getMonth() + 1)):(this.date.getMonth() + 1))
                        + '.' + this.date.getFullYear() + ' '
                        + (this.date.getHours() < 10 ? ('0' + this.date.getHours()):this.date.getHours())
                        + ':' + (this.date.getMinutes() < 10 ? ('0' + this.date.getMinutes()):this.date.getMinutes())}
                    </div>
                    <div className='desc'>
                        {this.add(this.homework.desc.split('<br/>'), <br/>)}
                    </div>
                </Fragment>;
            default:
                return '';
        }
    }
}

export default connect(mapToProps, actions)(Top);