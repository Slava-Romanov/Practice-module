import {h, Component, render, Fragment} from 'preact';
import {Link} from 'preact-router/match';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import Note_hw from './elements/note_hw'
import Storage from '../utils/data';
import editIcon from '../../images/penIcon.svg';
import findIcon from "../../images/top/findIcon.svg";

import {routerUrl} from "../utils/data";

const mapToProps = ({type, page, tableData, searchText}) => ({type, page, tableData, searchText});

export class Table extends Component {
    constructor(props) {
        super();
        this.label = '';
        this.initType(props);
    }

    initType(props) {
        switch (props.type) {
            case 'modules':
                this.label = 'Таблица модулей дисциплины';
                break;
            case 'lessons':
                this.label = 'Таблица занятий, модуль: "' + Storage.getModuleByID(props.page.moduleID).name + '"';
                break;
            case 'lesson':
                this.label = 'Таблица оценок занятия';
                /*, занятие: "' + Storage.getLessonByID(props.page.moduleID, props.page.lessonID).name
                + '", модуль: "' + Storage.getModuleByID(props.page.moduleID).name + '"';*/
                break;
            case 'homework':
                this.label = 'Таблица оценок домашнего задания';
                /*, домашнее задание: "' + Storage.getHomeworkByID(props.page.homeworkID).name + '"';*/
                break;
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.props.getKey);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.props.getKey);
    }

    static fillSearch(name, search) {
        if (search) {
            search = search.toLowerCase();
            const findIndex = name.toLowerCase().indexOf(search);
            let startStr = '', middleStr = '', endStr = '';
            if (findIndex !== -1) {
                startStr = name.substring(0, findIndex);
                middleStr = name.substring(findIndex, findIndex + search.length);
                endStr = name.substring(findIndex + search.length, name.length);
                return <Fragment>
                    {startStr}
                    <span className='yellow'>
                    {middleStr}
                </span>
                    {endStr}
                </Fragment>;
            } else {
                return <Fragment>
                    {name}
                </Fragment>;
            }
        } else {
            return name;
        }
    };

    render() {
        switch (this.props.type) {
            case 'modules':
                return <Fragment>
                    <div className='title-table'>{this.label}</div>
                    <table name='modules'>
                        <tr>
                            <th onClick={(e) => this.props.clickAllCheckbox(e)}
                                disabled={this.props.tableData.elements.length <= 0}>
                                <input type='checkbox' checked={this.props.tableData.allChecked}
                                       disabled={this.props.tableData.elements.length <= 0}/>
                            </th>
                            <th>№</th>
                            <th>Название</th>
                            <th>Занятий</th>
                            <th>Баллы</th>
                            <th></th>
                        </tr>
                        {
                            this.props.tableData.elements.map((el, index) => (
                                <tr data-index={index} data-num={el.num} className={el.checked ? 'checked' : null}>
                                    <td onClick={(e) => this.props.clickCheckbox(e, index)}>
                                        <input type='checkbox' id={'check_' + index} checked={el.checked}/>
                                    </td>
                                    <td>
                                        {Number(el.num) + 1}
                                    </td>
                                    <td>
                                        <Link activeClassName="active" href={routerUrl + "module/" + el.num}>
                                            {Table.fillSearch(el.name, this.props.searchText)}
                                        </Link>
                                    </td>
                                    <td>
                                        {Storage.getCountModuleLessons(el.num)}
                                    </td>
                                    <td>
                                        {el.max_points}
                                    </td>
                                    <td onClick={() => this.props.newModuleModal(el.num)}>
                                        <img src={editIcon}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </Fragment>;
            case 'lessons':
                return <Fragment>
                    <div className='title-table'>{this.label}<Note_hw/></div>
                    <table name='lessons'>
                        <tr>
                            <th onClick={(e) => this.props.clickAllCheckbox(e)}
                                disabled={this.props.tableData.elements.length <= 0}>
                                <input type='checkbox' checked={this.props.tableData.allChecked}
                                       disabled={this.props.tableData.elements.length <= 0}/>
                            </th>
                            <th>№</th>
                            <th>Название</th>
                            <th>Тип занятия</th>
                            <th>ДЗ</th>
                            <th></th>
                        </tr>
                        {
                            this.props.tableData.elements.map((el, index) => (
                                <tr data-index={index} data-num={el.num} className={el.checked ? 'checked' : null}>
                                    <td onClick={(e) => this.props.clickCheckbox(e, index)}>
                                        <input type='checkbox' id={'check_' + index} checked={el.checked}/>
                                    </td>
                                    <td>
                                        {Number(el.num) + 1}
                                    </td>
                                    <td>
                                        <Link activeClassName="active"
                                              href={routerUrl + "module/" + this.props.page.moduleID + "/lesson/" + el.num}>
                                            {Table.fillSearch(el.name, this.props.searchText)}
                                        </Link>
                                    </td>
                                    <td>
                                        <div className={el.type}>{Storage.typesHomeworkNames[el.type]}</div>
                                    </td>
                                    <td>
                                        {
                                            Storage.getHomeworkByLessonID(el.num, this.props.page.moduleID).map((el2) => (
                                                el2.start_hw ?
                                                    <Link activeClassName="active" href={routerUrl + "homework/" + el2.num}>
                                                        <div className='hw_s hw'>{el2.name}</div>
                                                    </Link>
                                                    : <Link activeClassName="active" href={routerUrl + "homework/" + el2.num}>
                                                        <div className='hw_e hw'>{el2.name}</div>
                                                    </Link>
                                            ))
                                        }
                                    </td>
                                    <td onClick={() => this.props.newLessonModal(el.num)}>
                                        <img src={editIcon}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </Fragment>;
            case 'lesson':
                return <Fragment>
                    <div className='table_parent'>
                    <div className='table'>
                        <div className='title-table'>{this.label}</div>
                        <div className='search'>
                            <img src={findIcon}/>
                            <input className='search_input' id='search_main_input' type='text'
                                   autoComplete='off' onInput={e => this.props.searchUpdate(e, this.props.type)}
                                   value={this.props.searchText}>
                            </input>
                        </div>
                        <table name='marks'>
                            <tr>
                                <th onClick={(e) => this.props.clickAllCheckbox(e)}
                                    disabled={this.props.tableData.elements.length <= 0}>
                                    <input type='checkbox' checked={this.props.tableData.allChecked}
                                           disabled={this.props.tableData.elements.length <= 0}/>
                                </th>
                                <th>№</th>
                                <th>Комментарий</th>
                                <th>Оценка</th>
                                <th></th>
                            </tr>
                            {
                                this.props.tableData.elements.map((el, index) => (
                                    <tr data-index={index} data-num={el.num} className={el.checked ? 'checked' : null}>
                                        <td onClick={(e) => this.props.clickCheckbox(e, index)}>
                                            <input type='checkbox' id={'check_' + index} checked={el.checked}/>
                                        </td>
                                        <td>
                                            {Number(el.num) + 1}
                                        </td>
                                        <td>
                                            {Table.fillSearch(el.name, this.props.searchText)}
                                        </td>
                                        <td>
                                            {el.points}
                                        </td>
                                        <td onClick={() => this.props.newMarkModal(el.num)}>
                                            <img src={editIcon}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                    </div>
                </Fragment>;
            case 'homework':
                return <Fragment>
                    <div className='table_parent'>
                    <div className='table'>
                        <div className='title-table'>{this.label}</div>
                        <div className='search'>
                            <img src={findIcon}/>
                            <input className='search_input' id='search_main_input' type='text'
                                   autoComplete='off' onInput={e => this.props.searchUpdate(e, this.props.type)}
                                   value={this.props.searchText}>
                            </input>
                        </div>
                        <table name='marks'>
                            <tr>
                                <th onClick={(e) => this.props.clickAllCheckbox(e)}
                                    disabled={this.props.tableData.elements.length <= 0}>
                                    <input type='checkbox' checked={this.props.tableData.allChecked}
                                           disabled={this.props.tableData.elements.length <= 0}/>
                                </th>
                                <th>№</th>
                                <th>Комментарий</th>
                                <th>Оценка</th>
                                <th></th>
                            </tr>
                            {
                                this.props.tableData.elements.map((el, index) => (
                                    <tr data-index={index} data-num={el.num} className={el.checked ? 'checked' : null}>
                                        <td onClick={(e) => this.props.clickCheckbox(e, index)}>
                                            <input type='checkbox' id={'check_' + index} checked={el.checked}/>
                                        </td>
                                        <td>
                                            {Number(el.num) + 1}
                                        </td>
                                        <td>
                                            {Table.fillSearch(el.name, this.props.searchText)}
                                        </td>
                                        <td>
                                            {el.points}
                                        </td>
                                        <td onClick={() => this.props.newMarkModal(el.num)}>
                                            <img src={editIcon}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                    </div>
                </Fragment>;
            default:
                return '';
        }
    }
}

export default connect(mapToProps, actions)(Table);