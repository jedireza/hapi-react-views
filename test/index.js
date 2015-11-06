var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var Vision = require('vision');
var HapiReactViews = require('../index');


require('babel-core/register')({
    presets: ['react', 'es2015']
});


var lab = exports.lab = Lab.script();


lab.experiment('Engine', function () {

    lab.test('it is an object with a compile method', function (done) {

        Code.expect(HapiReactViews).to.be.an.object();
        Code.expect(HapiReactViews.compile).to.be.a.function();
        done();
    });
});


lab.experiment('Rendering', function () {

    var server;

    lab.beforeEach(function (done) {

        server = new Hapi.Server(0);

        server.register(Vision, function (err) {

            if (err) {
                return done(err);
            }

            server.views({
                engines: {
                    jsx: HapiReactViews
                },
                relativeTo: __dirname,
                path: 'fixtures'
            });

            done();
        });
    });


    lab.test('it returns an error when the path misses', function (done) {

        var context = { title: 'Woops.' };

        server.render('viewz', context, function (err, output) {

            Code.expect(err).to.be.an.object();
            done();
        });
    });


    lab.test('it successfully renders', function (done) {

        var context = { title: 'Woot, it rendered.' };

        server.render('view', context, function (err, output) {

            Code.expect(err).to.not.exist();
            done();
        });
    });


    lab.test('it successfully renders with es6 export semantics', function (done) {

        var context = { title: 'Woot, it rendered.' };

        server.render('view-es6', context, function (err, output) {

            Code.expect(err).to.not.exist();
            done();
        });
    });


    lab.test('it successfully renders with runtime options', function (done) {

        var context = { title: 'Woot, with runtime options.' };
        var renderOpts = {
            runtimeOptions: {
                doctype: '<!DOCTYPE html>',
                renderMethod: 'renderToString'
            }
        };

        server.render('view', context, renderOpts, function (err, output) {

            Code.expect(err).to.not.exist();
            done();
        });
    });


    lab.test('it demonstrates keeping the require cache', function (done) {

        var context = { title: 'Woot, it rendered.' };
        var renderOpts = {
            runtimeOptions: {
                removeCache: false
            }
        };

        server.render('view', context, renderOpts, function (err, output) {

            Code.expect(err).to.not.exist();

            server.render('view', context, renderOpts, function (err, out) {

                Code.expect(err).to.not.exist();
                done();
            });
        });
    });
});
