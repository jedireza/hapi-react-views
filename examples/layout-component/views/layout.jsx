const React = require('react');


const Component = React.createClass({
    render: function () {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    {this.props.children}
                    <hr />
                    <p>
                        <a href="/">Home</a> | <a href="/about">About Us</a>
                    </p>
                </body>
            </html>
        );
    }
});


module.exports = Component;
