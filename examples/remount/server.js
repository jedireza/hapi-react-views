'use strict';

const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiReactViews = require('../..');


require('@babel/register')({
    presets: ['@babel/preset-react', '@babel/preset-env']
});


const main = async function () {

    const server = Hapi.Server({
        port: process.env.PORT
    });

    await server.register([Inert, Vision]);

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'components',
        compileOptions: {
            renderMethod: 'renderToString',
            layoutPath: Path.join(__dirname, 'components'),
            layout: 'html'
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/client.js',
        handler: {
            file: Path.join(__dirname, './assets/client.js')
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            const context = { foo: 'baz' };
            context.state = `window.state = ${JSON.stringify(context)};`;

            return h.view('app', context);
        }
    });

    await server.start();

    console.log(`Server is listening at ${server.info.uri}`);
};

main();
