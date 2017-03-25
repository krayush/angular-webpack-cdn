var helpers = require('../utils/helpers');
var commonConfig = require('./webpack.common')();
var webpackMerge = require('webpack-merge');
var webpackConfig = require('../utils/webpack-config')();
var DefinePlugin = require('webpack/lib/DefinePlugin');
var DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var createFile = require('create-file');
var webpackMergeDll = webpackMerge.strategy({
    plugins: 'replace'
});

module.exports = function () {
    var content = webpackConfig.externalAssetsConfig;
    content = helpers.replaceAll(JSON.stringify(JSON.stringify(content)), "{hash}", "");

    createFile(helpers.getAbsolutePath("src/externalAssets.json"), content, function() {
        console.error("Asset file written to src/externalAssets.json");
    });

    return webpackMerge(commonConfig, {
        devtool: 'cheap-module-source-map',
        output: {
            filename: '[name].bundle.js',
            path: helpers.getAbsolutePath('dist'),
            sourceMapFilename: '[file].map',
            chunkFilename: "[id].chunk.js"
        },
        module: {
            rules: [{
                test: /\.ts$/,
                // HMR is currently for development mode only as we are focusing on providing a CDN server
                use: [{
                    loader: '@angularclass/hmr-loader',
                    options: {
                        pretty: true,
                        prod: false
                    }
                }, {
                    loader: 'tslint-loader',
                    options: {
                        configFile: 'tslint.json'
                    }
                }],
                exclude: [helpers.getAbsolutePath('src/assets/styles')]
            }]
        },
        plugins: [
            new DefinePlugin({
                'ENV': JSON.stringify("development"),
                'HMR': webpackConfig.HMR,
                'process.env': {
                    'ENV': JSON.stringify("development"),
                    'NODE_ENV': JSON.stringify("development"),
                    'HMR': webpackConfig.HMR,
                }
            }),
            // For creating DLLs in dll directory
            new DllBundlesPlugin({
                bundles: {
                    polyfills: ['core-js', {
                        name: 'zone.js',
                        path: 'zone.js/dist/zone.js'
                    }, {
                        name: 'zone.js',
                        path: 'zone.js/dist/long-stack-trace-zone.js'
                    }],
                    vendor: [
                        '@angular/platform-browser',
                        '@angular/platform-browser-dynamic',
                        '@angular/core',
                        '@angular/common',
                        '@angular/forms',
                        '@angular/http',
                        '@angular/router',
                        '@angularclass/hmr',
                        'rxjs',
                    ]
                },
                dllDir: helpers.getAbsolutePath('dist'),
                webpackConfig: webpackMergeDll(commonConfig, {
                    devtool: 'cheap-module-source-map',
                    plugins: []
                })
            }),
            new AddAssetHtmlPlugin([{
                filepath: helpers.getAbsolutePath(`dist/${DllBundlesPlugin.resolveFile('polyfills')}`)
            }, {
                filepath: helpers.getAbsolutePath(`dist/${DllBundlesPlugin.resolveFile('vendor')}`)
            }]),
            new ExtractTextPlugin('[name].css'),
        ],
        devServer: webpackConfig.devServerConfig,
        // See: https://webpack.github.io/docs/configuration.html#node
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
};