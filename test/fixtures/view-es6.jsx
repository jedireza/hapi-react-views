import React from 'react';


class Component extends React.Component {

    render () {

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
}


export default Component;
