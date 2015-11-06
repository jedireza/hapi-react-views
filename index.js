'use strict';

const Hoek = require('hoek');
const React = require('react');
const ReactDOMServer = require('react-dom/server');


const EXT_REGEX = new RegExp('\\.jsx$');
const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production'
};


const compile = function compile (template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime (context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let Component = require(compileOpts.filename);
        // support es6 default export semantics
        Component = Component.default || Component;

        let Element = React.createFactory(Component);

        let output = renderOpts.doctype;
        output += ReactDOMServer[renderOpts.renderMethod](Element(context));

        // transpilers tend to take a long time to start up, so we delete react
        // modules from the cache so we don't need to restart to see view
        // changes (unless we're in production silly)
        if (renderOpts.removeCache) {
            Component = undefined;
            Element = undefined;

            Object.keys(require.cache).forEach((module) => {

                if (EXT_REGEX.test(module)) {
                    delete require.cache[module];
                }
            });
        }

        return output;
    };
};


module.exports = {
    compile: compile
};
