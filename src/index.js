import './index.css'

import { store } from './utils/store.js'
import { createPage } from './components/Page/page.js';
import { h } from 'preact';

createPage(store);