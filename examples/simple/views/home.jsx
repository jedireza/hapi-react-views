const React = require('react');


const Component = React.createClass({
    render () {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    <h1>Activate the plot device.</h1>
                </body>
            </html>
        );
    }
});


module.exports = Component;
