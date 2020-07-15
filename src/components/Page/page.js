import { Fragment, render, h } from 'preact';
import { createPageModules } from './../Modules/modules'

export const createPage = (store) => {
    const page = <Fragment>
        <div id="modal">
        </div>
        <div className="page">
            <div className="page_content">
                <div className="top_block" id="top_block">

                </div>
                <div id="table_block">

                </div>
            </div>
        </div>
        <div id="edit_panel">
        </div>
    </Fragment>;

    render(page, document.getElementById('root'));

    createPageModules(store);
};