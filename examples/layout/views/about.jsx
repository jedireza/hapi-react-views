const React = require('react');
const Layout = require('./layout.jsx');


const Component = React.createClass({
    render () {

        return (
            <Layout title="About Us">
                <h1>About the plot device.</h1>
            </Layout>
        );
    }
});


module.exports = Component;
