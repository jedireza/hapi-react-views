# hapi-react-views

A hapi view engine for React components.

[![Build Status](https://travis-ci.org/jedireza/hapi-react-views.svg?branch=master)](https://travis-ci.org/jedireza/hapi-react-views)
[![Dependency Status](https://david-dm.org/jedireza/hapi-react-views.svg?theme=shields.io)](https://david-dm.org/jedireza/hapi-react-views)
[![Peer Dependency Status](https://david-dm.org/jedireza/hapi-react-views/peer-status.svg?style=flat)](https://david-dm.org/jedireza/hapi-react-views#info=peerDependencies)
[![Dev Dependency Status](https://david-dm.org/jedireza/hapi-react-views/dev-status.svg?theme=shields.io)](https://david-dm.org/jedireza/hapi-react-views#info=devDependencies)

By default, we render static markup. We can also choose to use
`React.renderToString`, preserving the `data-react-id` attributes so
re-mounting client side is possible.


## Install

```bash
$ npm install hapi-react-views
```

Note: Your project should have it's own `react` dependency installed. We depend
on `react` via `peerDependencies`.


## Usage

Note: As of hapi v9.x, your project must register the
[`vision`](https://github.com/hapijs/vision) plugin in order for the
`server.views()` method to be available.

Configuring the server manually:

```js
var Hapi = require('hapi');
var Vision = require('vision');
var HapiReactViews = require('hapi-react-views');

var server = new Hapi.Server();

server.register(Vision, function (err) {

    if (err) {
        console.log("Failed to load vision.");
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

Configuring with a CLI manifest using
[`visionary`](https://github.com/hapijs/visionary):

```json
{
    "servers": [{
        "port": 8080
    }],
    "plugins": {
        "vision": {},
        "visionary": {
            "engines": {
              "jsx": "hapi-react-views"
            },
            "compileOptions": {},
            "path": "./views"
        }
    }
}
```


## API

### `server.views(options)`

[Please refer to the `vision` docs on
`server.views(options)` for complete details.](https://github.com/hapijs/vision/blob/master/API.md#serverviewsoptions)

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
    - `removeCache` - since `node-jsx` takes a while to startup, we can remove
      templates from the cache so we don't need to restart the server to see
      changes. Defaults to `'production' !== process.env.NODE_ENV`.
    - `useNodeJsx` - a boolean that controls if `node-jsx` is used. Defaults to
      `true`. Set to `false` if you're using another transformer (ex:
      `babel/require`) or don't need `jsx` transformations.
    - `node-jsx` - options object passed to
      [`node-jsx`](https://github.com/petehunt/node-jsx)'s `install` method.
      Defaults to `undefined`.

You're able to override all these `compileOptions` at runtime except `node-jsx`
which only happens once.

```js
var context = { name: 'Steve' };
var renderOpts = {
    runtimeOptions: {
        doctype: '<!DOCTYPE html>',
        renderMethod: 'renderToString'
    }
};

server.render('template', context, renderOpts, function (err, output) {

    // ...
});
```

[Please refer to `vision`'s docs on
`server.render(template, context, [options], callback)` for complete details.](https://github.com/hapijs/vision/blob/master/API.md#serverrendertemplate-context-options-callback)


## License

MIT


## Don't forget

What you create with `hapi-react-views` is more important than `hapi-react-views`.
