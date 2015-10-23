var Hoek = require('hoek');
var React = require('react');
var ReactDOMServer = require('react-dom/server');


var EXT_REGEX = new RegExp('\\.jsx$');
var DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production'
};


var compile = function compile (template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime (context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        var Component = require(compileOpts.filename);
        var Element = React.createFactory(Component);

        var output = renderOpts.doctype;
        output += ReactDOMServer[renderOpts.renderMethod](Element(context));

        // transpilers tend to take a long time to start up, so we delete react
        // modules from the cache so we don't need to restart to see view
        // changes (unless we're in production silly)
        if (renderOpts.removeCache) {
            Component = undefined;
            Element = undefined;

            Object.keys(require.cache).forEach(function (module) {

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
