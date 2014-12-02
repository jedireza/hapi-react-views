var Path = require('path');
var Hoek = require('hoek');
var React = require('react');


var EXT_REGEX = new RegExp('\\.jsx$');
var DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: 'production' !== process.env.NODE_ENV,
    'node-jsx': undefined
};


var compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);
    var filepath = Path.join(process.cwd(), compileOpts.filename);
    var Component, Element;
    require('node-jsx').install(compileOpts['node-jsx']);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);
        var output = renderOpts.doctype;
        Component = Component || require(filepath);
        Element = Element || React.createFactory(Component);
        output += React[renderOpts.renderMethod](Element(context));

        // node-jsx takes a long time to start up, so we delete
        // react modules from the cache so we don't need to restart
        // to see view changes (unless we're in production silly)
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
