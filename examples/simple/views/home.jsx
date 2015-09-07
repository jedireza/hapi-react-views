var React = require('react');


var Component = React.createClass({
    render: function () {

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
