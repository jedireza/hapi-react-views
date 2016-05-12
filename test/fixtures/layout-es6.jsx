import React from 'react';


class Component extends React.Component {

    render () {

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
}


export default Component;
