'use strict';

import React from 'react';


const Component = ({title, children}) => 
    (
    <html>
        <head>
            <title>{title}</title>
        </head>
        <body>
            <div id="content"
                dangerouslySetInnerHTML={{ __html: children }}>
            </div>
        </body>
    </html>
    );


export default Component