'use strict';

const React = require('react');


class View extends React.Component {
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
}


module.exports = View;
