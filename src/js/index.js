import './../index.css'

import App from './components/app';
import {Fragment, h, render} from 'preact';
import Storage from "./utils/data";

import { dataFileUrl } from "./utils/data";

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//import 'whatwg-fetch'
//window.
fetch(dataFileUrl).then((response) => {
    return response.json();
}).then((data) => {
    Storage.store = data;
}).then(() => {
    render(<App />, document.getElementById('root'));
});