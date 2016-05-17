const React = require('react');
const Layout = require('./layout.jsx');


const Component = React.createClass({
    render: function () {

        return (
            <Layout title="About Page">
                <h1>About the plot device.</h1>
            </Layout>
        );
    }
});


module.exports = Component;
