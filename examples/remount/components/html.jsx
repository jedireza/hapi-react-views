'use strict';

import React from 'react';


const Html = ({children, state}) => (
    <html>
        <head>
            <title>Remount Example</title>
        </head>
        <body>
            <div id="app-mount"
                dangerouslySetInnerHTML={{ __html: children }}
            />
            <script id="app-state"
                dangerouslySetInnerHTML={{ __html: state }}
            />
            <script src="/assets/client.js" />
        </body>
    </html>
);


export default Html;
