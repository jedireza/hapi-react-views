'use strict';
const Hoek = require('hoek');
const Path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');


const EXT_REGEX = /\.jsx$/;
const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production',
    layout: undefined,
    layoutPath: undefined,
    layoutRenderMethod: 'renderToStaticMarkup'
};


const compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let View = require(compileOpts.filename);
        // support for es6 default export semantics
        View = View.default || View;

        const ViewElement = React.createFactory(View);

        let output = renderOpts.doctype;

        if (renderOpts.layout) {
            const layoutPath = Path.join(renderOpts.layoutPath, renderOpts.layout + '.jsx');
            let Layout = require(layoutPath);
            // support for es6 default export semantics
            Layout = Layout.default || Layout;

            const LayoutElement = React.createFactory(Layout);

            const viewOutput = ReactDOMServer[renderOpts.renderMethod](ViewElement(context));

            output += ReactDOMServer[renderOpts.layoutRenderMethod](LayoutElement(context, viewOutput));
        }
        else {
            output += ReactDOMServer[renderOpts.renderMethod](ViewElement(context));
        }

        /*
         * Transpilers tend to take a while to start up. Here we delete `*.jsx`
         * modules from the require cache so we don't need to restart the app
         * to see view changes. Skipped By default when `NODE_ENV=production`.
         */
        if (renderOpts.removeCache) {
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
