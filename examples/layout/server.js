'use strict';

const Hapi = require('hapi');
const Path = require('path');
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
        path: 'views',
        compileOptions: {
            layoutPath: Path.join(__dirname, 'views'),
            layout: 'layout'
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.view('home', { title: 'Home Page' });
        }
    });

    server.route({
        method: 'GET',
        path: '/about',
        handler: (request, h) => {

            return h.view('about', { title: 'About Page' });
        }
    });

    await server.start();

    console.log(`Server is listening at ${server.info.uri}`);
};

main();
