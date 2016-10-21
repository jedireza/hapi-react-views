# hapi-react-views

A hapi view engine for React components.

[![Build Status](https://travis-ci.org/jedireza/hapi-react-views.svg?branch=master)](https://travis-ci.org/jedireza/hapi-react-views)
[![Dependency Status](https://david-dm.org/jedireza/hapi-react-views.svg?theme=shields.io)](https://david-dm.org/jedireza/hapi-react-views)
[![Peer Dependency Status](https://david-dm.org/jedireza/hapi-react-views/peer-status.svg?style=flat)](https://david-dm.org/jedireza/hapi-react-views#info=peerDependencies)
[![Dev Dependency Status](https://david-dm.org/jedireza/hapi-react-views/dev-status.svg?theme=shields.io)](https://david-dm.org/jedireza/hapi-react-views#info=devDependencies)

By default, we render static markup using `renderToStaticMarkup`. We can also
choose to use `renderToString`, preserving the `data-react-id` attributes so
re-mounting client side is possible.


## Install

```bash
$ npm install hapi-react-views
```

Note: Your project should have it's own `react` and `react-dom` dependencies
installed. We depend on these via `peerDependencies`.


## Usage

Note: As of `hapi-react-views` v4.x your project must register a transpiler
such as [`babel`][babel] or [`node-jsx`][node-jsx]. An alternative to this is
to transpile ahead of time and save the result to file.

[babel]: https://github.com/babel/babel
[node-jsx]: https://github.com/petehunt/node-jsx

Note: As of `hapi` v9.x, your project must register the [`vision`][vision]
plugin in order for the `server.views()` and `server.render()` methods to be
available.

[vision]: https://github.com/hapijs/vision

Configuring the server manually:

```js
const Hapi = require('hapi');
const Vision = require('vision');
const HapiReactViews = require('hapi-react-views');

require('babel-core/register')({
    presets: ['react', 'es2015']
});

const server = new Hapi.Server();

server.register(Vision, (err) => {

    if (err) {
        console.log('Failed to load vision.');
    }

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        compileOptions: {}, // optional
        relativeTo: __dirname,
        path: 'views'
    });
});
```

Configuring with a CLI manifest using [`visionary`][visionary]:

[visionary]: https://github.com/hapijs/visionary

```json
{
    "connections": [{
        "port": 8080
    }],
    "registrations": [{
        "plugin": "vision",
        "plugin": {
            "register": "visionary",
            "options": {
                "engines": {
                  "jsx": "hapi-react-views"
                },
                "compileOptions": {},
                "path": "./views"
            }
        }
    }]
}
```


## API

### `server.views(options)`

[Please refer to the `vision` docs on `server.views(options)` for complete
details.][vision-docs]

[vision-docs]: https://github.com/hapijs/vision/blob/master/API.md#serverviewsoptions

We'll be focusing on the `compileOptions` property that you can include when
passing `options` to `server.views`.

The following `compileOptions` will customize how `hapi-react-views` works.

  - `compileOptions` - options object passed to the engine's compile function.
    Defaults to `{}`.
    - `doctype` - a simple string prepended to the response. Defaults to
      `<!DOCTYPE html>`
    - `renderMethod` - the method to invoke on `React` to generate our output.
      Available options are `renderToStaticMarkup` and `renderToString`.
      Defaults to `renderToStaticMarkup`.
    - `removeCache` - since transpilers tend to take a while to startup, we can
      remove templates from the require cache so we don't need to restart the
      server to see changes. Defaults to `'production' !==
      process.env.NODE_ENV`.
    - `removeCacheRegExp` - a `RegExp` pattern string, matching modules in
      require cache will be removed. Defaults to `undefined`.
    - `layout` - the name of the layout file to use.
    - `layoutPath` - the directory path of where layouts are stored.
    - `layoutRenderMethod` - same as `renderMethod` but used for layouts.
      Defaults to `renderToStaticMarkup`.

You're able to override all these `compileOptions` at runtime.

```js
const context = { name: 'Steve' };
const renderOpts = {
    runtimeOptions: {
        doctype: '<!DOCTYPE html>',
        renderMethod: 'renderToString'
    }
};

server.render('template', context, renderOpts, (err, output) => {

    // ...
});
```

[Please refer to `vision`'s docs on
`server.render(template, context, [options], callback)` for complete details.](https://github.com/hapijs/vision/blob/master/API.md#serverrendertemplate-context-options-callback)


## Examples

Before you can run the examples, you need to clone this repo and install the dependencies.

```bash
$ git clone git@github.com:jedireza/hapi-react-views.git
$ cd hapi-react-views
$ npm install
```

### Rendering a simple page

This example renders a simple component as HTML output. [View the
code.][ex-simple]

[ex-simple]: https://github.com/jedireza/hapi-react-views/tree/master/examples/simple

```bash
$ npm run simple-example
```

### Rendering with layouts

#### Wrapper style layouts

This example is renders simple components as HTML but adds the idea of using
wrapper layouts. [View the code.][ex-layouts]

[ex-layouts]: https://github.com/jedireza/hapi-react-views/tree/master/examples/layout

```bash
$ npm run layout-example
```

#### Component style layouts

This example is renders simple components as HTML but adds the idea of using
component layouts. [View the code.][ex-comp-layouts]

[ex-comp-layouts]: https://github.com/jedireza/hapi-react-views/tree/master/examples/layout-component

```bash
$ npm run layout-component-example
```

### Remounting on the client (universal/isomorphic)

This example demonstrates the idea of remounting client side in order to create
universal/isomorphic applications. It also uses the wrapper layout feature so
the main view can be remounted on the client. [View the code.][ex-remount]

[ex-remount]: https://github.com/jedireza/hapi-react-views/tree/master/examples/remount

```bash
$ npm run remount-example
```


## License

MIT


## Don't forget

What you create with `hapi-react-views` is more important than `hapi-react-views`.
