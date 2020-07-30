import './../index.css'

import App from './components/app';
import {Fragment, h, render} from 'preact';
import Storage from "./utils/data";

fetch('/data.json').then((response) => {
    return response.json();
}).then((data) => {
    Storage.store = data;
}).then(() => {
    render(<App />, document.getElementById('root'));
});