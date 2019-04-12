'use strict';

const React = require('react');
const Layout = require('./layout.jsx');


class HomeView extends React.Component {
    render () {

        return (
            <Layout title="Home Page">
                <h1>Welcome to the plot device.</h1>
            </Layout>
        );
    }
}


module.exports = HomeView;
