'use strict';
const Code = require('code');
const Hapi = require('hapi');
const HapiReactViews = require('../index');
const Lab = require('lab');
const Path = require('path');
const Vision = require('vision');


require('babel-core/register')({
    presets: ['react', 'es2015']
});


const lab = exports.lab = Lab.script();


lab.experiment('Engine', () => {

    lab.test('it is an object with a compile method', (done) => {

        Code.expect(HapiReactViews).to.be.an.object();
        Code.expect(HapiReactViews.compile).to.be.a.function();
        done();
    });
});


lab.experiment('Rendering', () => {

    let server;

    lab.beforeEach((done) => {

        server = new Hapi.Server(0);

        server.register(Vision, (err) => {

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


    lab.test('it returns an error when the path misses', (done) => {

        const context = { title: 'Woops.' };

        server.render('viewz', context, (err, output) => {

            Code.expect(err).to.be.an.object();
            done();
        });
    });


    lab.test('it successfully renders', (done) => {

        const context = { title: 'Woot, it rendered.' };

        server.render('view', context, (err, output) => {

            Code.expect(err).to.not.exist();
            done();
        });
    });


    lab.test('it successfully renders with es6 export semantics', (done) => {

        const context = { title: 'Woot, it rendered.' };

        server.render('view-es6', context, (err, output) => {

            Code.expect(err).to.not.exist();
            done();
        });
    });


    lab.test('it successfully renders with runtime options', (done) => {

        const context = { title: 'Woot, with runtime options.' };
        const renderOpts = {
            runtimeOptions: {
                doctype: '<!DOCTYPE html>',
                renderMethod: 'renderToString'
            }
        };

        server.render('view', context, renderOpts, (err, output) => {

            Code.expect(err).to.not.exist();
            done();
        });
    });


    lab.test('it demonstrates keeping the require cache', (done) => {

        const context = { title: 'Woot, it rendered.' };
        const renderOpts = {
            runtimeOptions: {
                removeCache: false
            }
        };

        server.render('view', context, renderOpts, (err, output) => {

            Code.expect(err).to.not.exist();

            server.render('view', context, renderOpts, (err, out) => {

                Code.expect(err).to.not.exist();
                done();
            });
        });
    });


    lab.test('it demonstrates removing matching modules from the require cache', (done) => {

        const context = { title: 'Woot, it rendered.' };
        const renderOpts = {
            runtimeOptions: {
                removeCacheRegExp: 'navbar'
            }
        };

        server.render('view', context, renderOpts, (err, output) => {

            Code.expect(err).to.not.exist();

            server.render('view', context, renderOpts, (err, out) => {

                Code.expect(err).to.not.exist();
                done();
            });
        });
    });
});


lab.experiment('Layouts', () => {

    let server;

    lab.beforeEach((done) => {

        server = new Hapi.Server(0);

        server.register(Vision, (err) => {

            if (err) {
                return done(err);
            }

            server.views({
                engines: {
                    jsx: HapiReactViews
                },
                relativeTo: __dirname,
                path: 'fixtures',
                compileOptions: {
                    layoutPath: Path.join(__dirname, 'fixtures'),
                    layout: 'layout'
                }
            });

            done();
        });
    });


    lab.test('it successfully renders', (done) => {

        const context = { title: 'Woot, it rendered.' };

        server.render('view', context, (err, output) => {

            Code.expect(err).to.not.exist();
            done();
        });
    });


    lab.test('it successfully renders with es6 export semantics', (done) => {

        const context = { title: 'Woot, it rendered.' };
        const renderOpts = {
            runtimeOptions: {
                layout: 'layout-es6'
            }
        };

        server.render('view-es6', context, renderOpts, (err, output) => {

            Code.expect(err).to.not.exist();
            done();
        });
    });
});
