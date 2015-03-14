var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var Hoek = require('hoek');
var HapiReactViews = require('../index');


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
        server.views({
            engines: {
                jsx: HapiReactViews
            },
            relativeTo: __dirname,
            path: 'fixtures'
        });

        done();
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


    lab.test('it demonstrates caching', function (done) {

        var context = { title: 'Woot, it rendered.' };
        var renderOpts = {
            runtimeOptions: {
                removeCache: false
            }
        };

        server.render('view', context, renderOpts, function (err, output) {

            Code.expect(err).to.not.exist();

            server.render('view', context, renderOpts, function (err, output) {

                Code.expect(err).to.not.exist();
                done();
            });
        });
    });
});


lab.experiment('Layout', function () {

    var createServer = function (viewOptions) {
        var server = new Hapi.Server(0);
        server.views(Hoek.applyToDefaults({
            engines: {
                jsx: HapiReactViews
            },
            relativeTo: __dirname,
            path: 'fixtures'
        }, viewOptions));

        return server;
    };

    lab.test('loads default layout.jsx when layout equals true', function (done) {
        var server = createServer({
            layout: true
        });
        var context = { title: 'Woot, it rendered.' };
        server.render('component', context, function (err, output) {
            console.log(err);
            Code.expect(err).to.not.exist();
            Code.expect(output).to.include('<html>');
            done();
        });
    });

    lab.test('loads named layout when layout is a file name', function (done) {
        var server = createServer({
            layout: 'layout'
        });
        var context = { title: 'Woot, it rendered.' };
        server.render('component', context, function (err, output) {
            Code.expect(err).to.not.exist();
            Code.expect(output).to.include('<html>');
            done();
        });
    });

    lab.test('passes view context to layout template', function (done) {
        var server = createServer({
            layout: 'layout'
        });
        var context = { title: 'The title text' };

        server.render('component', context, function (err, output) {
            Code.expect(err).to.not.exist();
            Code.expect(output).to.include('<h1>' + context.title + '</h1>');
            done();
        });
    });

    lab.test('renders doctype declaration only on template, not component', function (done) {
        var doctype = '<!DOCTYPE imaginary>';
        var server = createServer({
            layout: 'layout',
            compileOptions: {
                doctype: doctype
            }
        });
        var context = { title: 'The title text' };

        server.render('component', context, function (err, output) {
            Code.expect(err).to.not.exist();
            Code.expect(output.lastIndexOf(doctype)).to.equal(0);
            done();
        });
    });

    lab.experiment('layoutMethod option', function (done) {

        lab.test('defaults to renderToStaticMarkup', function (done) {
            var server = createServer({
                layout: true
            });
            var context = { title: 'Woot, it rendered.' };
            server.render('component', context, function (err, output) {
                Code.expect(output).to.include('<html>');
                Code.expect(output).not.to.include('data-react');
                done();
            });
        });

        lab.test('only affects layout rendering', function (done) {
            var server = createServer({
                layout: true,
                compileOptions: {
                    renderMethod: 'renderToString',
                    layoutMethod: 'renderToStaticMarkup'
                }
            });
            var context = { title: 'Woot, it rendered.' };
            server.render('component', context, function (err, output) {
                Code.expect(output).to.include('<html>');
                Code.expect(output).to.include('<h1 data-react');
                done();
            });
        });
    });
});
