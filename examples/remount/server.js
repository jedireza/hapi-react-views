var Path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiReactViews = require('../..');


require('babel/register')({});


var server = new Hapi.Server();
server.connection();
server.register([Inert, Vision], function (err) {

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
        handler: function (request, reply) {

            var appContext = {
                foo: 'baz'
            };
            var renderOpts = {
                runtimeOptions: {
                    renderMethod: 'renderToString'
                }
            };

            server.render('app', appContext, renderOpts, function (err, appOutput) {

                var htmlContext = {
                    remount: appOutput,
                    state: 'window.state = ' + JSON.stringify(appContext) + ';'
                };

                server.render('html', htmlContext, function (err, htmlOutput) {

                    reply(htmlOutput);
                });
            });
        }
    });

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});
