var React = require('react');
var Layout = require('./layout.jsx');


var Component = React.createClass({
    render: function () {

        return (
            <Layout title="Home Page">
                <h1>Welcome to the plot device.</h1>
            </Layout>
        );
    }
});


module.exports = Component;
