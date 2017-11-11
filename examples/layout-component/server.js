'use strict';
const Hapi = require('hapi');
const Vision = require('vision');
const HapiReactViews = require('../..');


require('babel-core/register')({
    presets: ['react', 'env']
});


const main = async function () {

    const server = Hapi.Server({
        port: process.env.PORT
    });

    await server.register(Vision);

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'views'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.view('home');
        }
    });

    server.route({
        method: 'GET',
        path: '/about',
        handler: (request, h) => {

            return h.view('about');
        }
    });

    await server.start();

    console.log(`Server is listening at ${server.info.uri}`);
};

main();
