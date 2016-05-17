const React = require('react');


const Component = React.createClass({
    render: function () {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    <div id="content"
                        dangerouslySetInnerHTML={{ __html: this.props.children }}>
                    </div>
                </body>
            </html>
        );
    }
});


module.exports = Component;
