const React = require('react');


const Component = React.createClass({
    render () {

        return (
            <html>
                <head>
                    <title>Remount Example</title>
                </head>
                <body>
                    <div id="app-mount"
                        dangerouslySetInnerHTML={{ __html: this.props.remount }}>
                    </div>
                    <script id="app-state"
                        dangerouslySetInnerHTML={{ __html: this.props.state }}>
                    </script>
                    <script src="/assets/client.js"></script>
                </body>
            </html>
        );
    }
});


module.exports = Component;
