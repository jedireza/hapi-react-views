var Hoek = require('hoek');
var React = require('react');


var EXT_REGEX = new RegExp('\\.jsx$');
var DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    viewRenderMethod: 'renderToStaticMarkup',
    layoutRenderMethod: 'renderToStaticMarkup',
    layoutKeyword: 'content',
    removeCache: process.env.NODE_ENV !== 'production',
    'node-jsx': undefined
};


var compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);
    var Component, Element;
    require('node-jsx').install(compileOpts['node-jsx']);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        var output = renderOpts.doctype;
        var layoutKeyword = renderOpts.layoutKeyword;
        var isRenderingLayout = typeof context[layoutKeyword] === 'string' &&
            context[layoutKeyword].indexOf(renderOpts.doctype) === 0;

        Component = Component || require(compileOpts.filename);
        Element = Element || React.createFactory(Component);

        if (isRenderingLayout) {
            context[layoutKeyword] = context[layoutKeyword].slice(renderOpts.doctype.length);
            output += React[renderOpts.layoutRenderMethod](Element(context));
        }
        else {
            output += React[renderOpts.viewRenderMethod](Element(context));
        }

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
