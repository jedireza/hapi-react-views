'use strict';

const Path = require('path');


module.exports = {
    entry: Path.join(__dirname, './client.js'),
    resolve: {
        extensions: ['.js', '.jsx']
    },
    mode: 'development',
    output: {
        path: Path.resolve(__dirname),
        filename: './assets/client.js'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
            }
        }]
    }
};
