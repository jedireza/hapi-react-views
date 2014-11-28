var React = require('react');


var Component = React.createClass({
    render: function () {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    <p>Activate the plot device.</p>
                </body>
            </html>
        );
    }
});


module.exports = Component;
