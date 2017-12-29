const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: '[name].bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "jshint-loader",
                        options: { esversion:6 }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),  // for debug this option show commented and devtool: 'source-map' uncommented
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 5000,
            browser: "google chrome",
            files: ['./*.html'],
            server: { baseDir: ['./'] },
            // proxy: 'blog-server.local',
        })
    ]
};