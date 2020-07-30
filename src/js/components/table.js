import {h, Component, render, Fragment} from 'preact';
import {connect} from 'redux-zero/preact';

import actions from '../actions/actions';

import Storage from '../utils/data';
import editIcon from '../../images/editIcon.svg';

const mapToProps = ({tableData, searchText}) => ({tableData, searchText});

class Table extends Component {
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
                break;
            case 'homeworks':
                break;
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', e => this.props.getKey(e));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', e => this.props.getKey(e));
    }

    fillSearch(name, search) {
        if (search) {
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
            }
        } else {
            return name;
        }
    };

    render() {
        return <Fragment>
            <h1>{this.label}</h1>
            <table name='modules'>
                <tr>
                    <th onClick={(e) => this.props.clickAllCheckbox(e)}>
                        <input type='checkbox' checked={this.props.tableData.allChecked}/>
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
                                {this.fillSearch(el.name, this.props.searchText)}
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
    }
}

export default connect(mapToProps, actions)(Table);