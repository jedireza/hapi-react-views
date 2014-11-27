# hapi-react-views

A hapi view engine for React components.

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

Configuring the server:

```js
var Path = require('path');
var Hapi = require('hapi');


var server = new Hapi.Server(3000);


server.views({
    engines: {
        jsx: require('hapi-react-views')
    },
    path: Path.join(__dirname, 'views')
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
        "visionary": {
            "engines": { "jsx": "hapi-react-views" },
            "path": "./views"
        }
    }
}
```


## License

MIT


## Don't forget

What you create with `hapi-react-views` is more important than `hapi-react-views`.
