var React = require('react');


var Layout = React.createClass({
    render: function () {

        var markup = { __html: this.props.content };

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body dangerouslySetInnerHTML={markup}></body>
            </html>
        );
    }
});


module.exports = Layout;
