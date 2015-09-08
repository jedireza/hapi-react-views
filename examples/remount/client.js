var React = require('react');
var AppComponent = require('./components/app.jsx');


var App = React.createFactory(AppComponent);
var mountNode = document.getElementById('app-mount');
var serverState = window.state;


React.render(App(serverState), mountNode);
