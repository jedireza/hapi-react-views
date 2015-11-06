var Hapi = require('hapi');
var Vision = require('vision');
var HapiReactViews = require('../..');


require('babel-core/register')({
    presets: ['react', 'es2015']
});


var server = new Hapi.Server();
server.connection();
server.register(Vision, function (err) {

    if (err) {
        console.log('Failed to load vision.');
    }

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
        handler: function (request, reply) {

            reply.view('home');
        }
    });

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server is listening at ' + server.info.uri);
    });
});
