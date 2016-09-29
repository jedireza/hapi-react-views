'use strict';
const Hoek = require('hoek');
const Path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');


const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production',
    removeCacheRegExp: undefined,
    layout: undefined,
    layoutPath: undefined,
    layoutRenderMethod: 'renderToStaticMarkup'
};


const compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let View = require(renderOpts.filename);
        // support for es6 default export semantics
        View = View.default || View;

        const ViewElement = React.createFactory(View);

        let output = renderOpts.doctype;

        let layoutPath;

        if (renderOpts.layout) {
            layoutPath = Path.join(renderOpts.layoutPath, renderOpts.layout);
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
         * Transpilers tend to take a while to start up. Here we delete the
         * view and layout modules (and any modules matching the
         * `removeCacheRegExp` pattern) from the require cache so we don't need
         * to restart the app to see view changes.
         */
        if (renderOpts.removeCache) {
            if (renderOpts.layout) {
                const layoutKey = require.resolve(layoutPath);
                delete require.cache[layoutKey];
            }

            const viewKey = require.resolve(renderOpts.filename);
            delete require.cache[viewKey];

            if (renderOpts.removeCacheRegExp) {
                const regexp = new RegExp(renderOpts.removeCacheRegExp);

                Object.keys(require.cache).forEach((cacheKey) => {

                    if (regexp.test(cacheKey)) {
                        delete require.cache[cacheKey];
                    }
                });
            }
        }

        return output;
    };
};


module.exports = {
    compile
};
