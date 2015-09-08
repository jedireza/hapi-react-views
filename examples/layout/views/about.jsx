var React = require('react');
var Layout = require('./layout.jsx');


var Component = React.createClass({
    render: function () {

        return (
            <Layout title="About Us">
                <h1>About the plot device.</h1>
            </Layout>
        );
    }
});


module.exports = Component;
