'use strict';

const React = require('react');
const Layout = require('./layout.jsx');


class AboutView extends React.Component {
    render () {

        return (
            <Layout title="About Page">
                <h1>About the plot device.</h1>
            </Layout>
        );
    }
}


module.exports = AboutView;
