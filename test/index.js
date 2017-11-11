'use strict';
const Hapi = require('hapi');
const HapiReactViews = require('../index');
const Lab = require('lab');
const Path = require('path');
const Vision = require('vision');


require('babel-core/register')({
    presets: ['react', 'env']
});


const lab = exports.lab = Lab.script();


lab.experiment('Engine', () => {

    lab.test('it is an object with a compile method', () => {

        lab.expect(HapiReactViews).to.be.an.object();
        lab.expect(HapiReactViews.compile).to.be.a.function();
    });
});


lab.experiment('Rendering', () => {

    let server;

    lab.beforeEach(async () => {

        server = Hapi.Server();

        await server.register(Vision);

        server.views({
            engines: {
                jsx: HapiReactViews
            },
            relativeTo: __dirname,
            path: 'fixtures'
        });
    });


    lab.test('it returns an error when the path misses', async () => {

        const context = {
            title: 'Woops.'
        };

        try {
            await server.render('viewz', context);
        }
        catch (err) {
            lab.expect(err).to.be.an.object();
        }
    });


    lab.test('it successfully renders', async () => {

        const context = {
            title: 'Woot, it rendered.'
        };

        await server.render('view', context);
    });


    lab.test('it successfully renders with es6 export semantics', async () => {

        const context = {
            title: 'Woot, it rendered.'
        };

        await server.render('view-es6', context);
    });


    lab.test('it successfully renders with runtime options', async () => {

        const context = {
            title: 'Woot, with runtime options.'
        };
        const renderOpts = {
            runtimeOptions: {
                doctype: '<!DOCTYPE html>',
                renderMethod: 'renderToString'
            }
        };

        await server.render('view', context, renderOpts);
    });


    lab.test('it demonstrates keeping the require cache', async () => {

        const context = {
            title: 'Woot, it rendered.'
        };
        const renderOpts = {
            runtimeOptions: {
                removeCache: false
            }
        };

        await server.render('view', context, renderOpts);
        await server.render('view', context, renderOpts);
    });


    lab.test('it demonstrates removing matching modules from the require cache', async () => {

        const context = {
            title: 'Woot, it rendered.'
        };
        const renderOpts = {
            runtimeOptions: {
                removeCacheRegExp: 'navbar'
            }
        };

        await server.render('view', context, renderOpts);
        await server.render('view', context, renderOpts);
    });
});


lab.experiment('Layouts', () => {

    let server;

    lab.beforeEach(async () => {

        server = Hapi.Server();

        await server.register(Vision);

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
    });


    lab.test('it successfully renders', async () => {

        const context = {
            title: 'Woot, it rendered.'
        };

        await server.render('view', context);
    });


    lab.test('it successfully renders with es6 export semantics', async () => {

        const context = {
            title: 'Woot, it rendered.'
        };
        const renderOpts = {
            runtimeOptions: {
                layout: 'layout-es6'
            }
        };

        await server.render('view-es6', context, renderOpts);
    });
});
