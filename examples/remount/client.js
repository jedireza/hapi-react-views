// global window document
'use strict';

import ReactDOM from 'react-dom'
import AppComponent from './components/app';


const App = AppComponent;
const mountNode = document.getElementById('app-mount');
const serverState = window.state;


ReactDOM.hydrate(App(serverState), mountNode);
