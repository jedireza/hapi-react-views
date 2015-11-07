'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiReactViews = require('../..');


require('babel-core/register')({
    presets: ['react', 'es2015']
});


const server = new Hapi.Server();
server.connection();
server.register([Inert, Vision], (err) => {

    if (err) {
        console.log('Failed to load plugins.');
    }

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        relativeTo: __dirname,
        path: 'components'
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
        handler: (request, reply) => {

            const appContext = {
                foo: 'baz'
            };
            const renderOpts = {
                runtimeOptions: {
                    renderMethod: 'renderToString'
                }
            };

            server.render('app', appContext, renderOpts, (err, appOutput) => {

                const htmlContext = {
                    remount: appOutput,
                    state: 'window.state = ' + JSON.stringify(appContext) + ';'
                };

                server.render('html', htmlContext, (err, htmlOutput) => {

                    reply(htmlOutput);
                });
            });
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});
