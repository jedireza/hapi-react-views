# hapi-react-views

A hapi view engine for React components.

[![Build Status](https://img.shields.io/travis/jedireza/hapi-react-views.svg)](https://travis-ci.org/jedireza/hapi-react-views)
[![Dependency Status](https://img.shields.io/david/jedireza/hapi-react-views.svg)](https://david-dm.org/jedireza/hapi-react-views)
[![Peer Dependency Status](https://img.shields.io/david/peer/jedireza/hapi-react-views.svg)](https://david-dm.org/jedireza/hapi-react-views?type=peer)
[![Dev Dependency Status](https://img.shields.io/david/dev/jedireza/hapi-react-views.svg)](https://david-dm.org/jedireza/hapi-react-views?type=dev)

By default rendering is done using `ReactDOMServer.renderToStaticMarkup`. You
can also choose to use `ReactDOMServer.renderToString`, preserving the
`data-react-id` attributes so re-mounting client side is possible.


## Install

```bash
$ npm install hapi-react-views
```

Note: Your project should have it's own `react` and `react-dom` dependencies
installed. We depend on these via `peerDependencies`.


## Usage

Configuring the server manually:

```js
const Hapi = require('@hapi/hapi');
const HapiReactViews = require('hapi-react-views');
const Vision = require('@hapi/vision');

require('@babel/register')({
    presets: ['@babel/preset-react', '@babel/preset-env']
});

const main = async function () {
    const server = Hapi.Server();

    await server.register(Vision);

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        compileOptions: {}, // optional
        relativeTo: __dirname,
        path: 'views'
    });

    await server.start();

    console.log(`Server is listening at ${server.info.uri}`);
};

main();
```

Note: As of `hapi-react-views` v4.x your project must register a transpiler
such as [`babel`][babel]. An alternative to this is to transpile ahead of time
and save the result to file.

[babel]: https://github.com/babel/babel

Note: As of `hapi` v9.x, your project must register the [`vision`][vision]
plugin in order for the `server.views()` and `server.render()` methods to be
available.

[vision]: https://github.com/hapijs/vision


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
  - `renderMethod` - the method to invoke on `ReactDOMServer` to generate our
    output. Available options are `renderToStaticMarkup` and `renderToString`.
    Defaults to `renderToStaticMarkup`.
  - `removeCache` - since transpilers tend to take a while to startup, we can
    remove templates from the require cache so we don't need to restart the
    server to see changes. Defaults to `'production' !== process.env.NODE_ENV`.
  - `removeCacheRegExp` - a `RegExp` pattern string, matching modules in
    require cache will be removed. Defaults to `undefined`.
  - `layout` - the name of the layout file to use.
  - `layoutPath` - the directory path of where layouts are stored.
  - `layoutRenderMethod` - same as `renderMethod` but used for layouts.
    Defaults to `renderToStaticMarkup`.

You can override all these `compileOptions` at runtime.

```js
const context = { name: 'Steve' };
const renderOpts = {
    runtimeOptions: {
        doctype: '<!DOCTYPE html>',
        renderMethod: 'renderToString'
    }
};

const output = await server.render('template', context, renderOpts);
```

[Please refer to `vision`'s docs on
`server.render(template, context, [options], callback)` for complete details.](https://github.com/hapijs/vision/blob/master/API.md#serverrendertemplate-context-options-callback)


## Examples

Before you can run the examples, you need to clone this repo and install the
dependencies.

```bash
$ git clone https://github.com/jedireza/hapi-react-views.git
$ cd hapi-react-views
$ npm install
```

### Rendering a simple page

This example renders a component as HTML output. [View the code.][ex-simple]

[ex-simple]: https://github.com/jedireza/hapi-react-views/tree/master/examples/simple

```bash
$ npm run simple-example
```

### Rendering with layouts

#### Wrapper style layouts

This example renders components as HTML adding the idea of using wrapper
layouts. The wrapping is handled by this module, so it may feel like a bit of
magic since there is no direct dependency to the layout in your component
views. [View the code.][ex-layouts]

[ex-layouts]: https://github.com/jedireza/hapi-react-views/tree/master/examples/layout

```bash
$ npm run layout-example
```

#### Component style layouts

This example renders components as HTML but adds the idea of using component
layouts. The component layout is a direct dependency of your view components
with no magic handling by this module. [View the code.][ex-comp-layouts]

[ex-comp-layouts]: https://github.com/jedireza/hapi-react-views/tree/master/examples/layout-component

```bash
$ npm run layout-component-example
```

### Remounting on the client (universal/isomorphic)

This example demonstrates the idea of rendering the full page on the server and
remounting the app view on the client side as a way to to create universal (aka
isomorphic) applications.

It uses the wrapper layout feature, making it easy for the layout to be
rendered without `data-react-id` attributes and the app view to be rendered
with them. [View the code.][ex-remount]

[ex-remount]: https://github.com/jedireza/hapi-react-views/tree/master/examples/remount

```bash
$ npm run remount-example
```


## License

MIT


## Don't forget

What you create with `hapi-react-views` is more important than `hapi-react-views`.
