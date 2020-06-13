'use strict';

import React from 'react'

const LayoutView = ({title, children}) => 
    (
        <html>
            <head>
                <title>{title}</title>
            </head>
            <body>
                <div id="content"
                    dangerouslySetInnerHTML={{ __html: children }}>
                </div>
                <hr />
                <p>
                    <a href="/">Home</a> | <a href="/about">About Us</a>
                </p>
            </body>
        </html>
    );

export default LayoutView;
