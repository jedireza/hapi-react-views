const React = require('react');
const Layout = require('./layout.jsx');


const Component = React.createClass({
    render: function () {

        return (
            <Layout title="Home Page">
                <h1>Welcome to the plot device.</h1>
            </Layout>
        );
    }
});


module.exports = Component;
