'use strict';
// precompiled with Babel (like when using the require hook for Babel)

var React = require('react');

var Component = React.createClass({
    displayName: 'Component',

    render: function render() {

        return React.createElement(
            'html',
            null,
            React.createElement(
                'head',
                null,
                React.createElement(
                    'title',
                    null,
                    this.props.title
                )
            ),
            React.createElement(
                'body',
                null,
                React.createElement(
                    'p',
                    null,
                    'This is precompiled.'
                )
            )
        );
    }
});

module.exports = Component;