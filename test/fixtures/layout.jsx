var React = require('react');


var Layout = React.createClass({
    render: function () {
        var content = {
            __html: this.props.content
        };
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body dangerouslySetInnerHTML={content}>
                </body>
            </html>
        );
    }
});


module.exports = Layout;
