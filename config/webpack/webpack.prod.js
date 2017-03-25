var helpers = require('../utils/helpers');
var commonConfig = require('./webpack.common')();
var webpackMerge = require('webpack-merge');
var OptimizeJsPlugin = require('optimize-js-plugin');
var webpackConfig = require('../utils/webpack-config')();
var DefinePlugin = require('webpack/lib/DefinePlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var createFile = require('create-file');
var file = require('jsonfile');

module.exports = function () {
    var timer = +Date.now();
    var content = webpackConfig.externalAssetsConfig;
    content = helpers.replaceAll(JSON.stringify(JSON.stringify(content)), "{hash}", timer);
    createFile(helpers.getAbsolutePath("src/externalAssets.json"), content, function() {
        console.error("Asset file written to src/externalAssets.json");
    });
    return webpackMerge(commonConfig, {
        devtool: 'source-map',
        output: {
            path: helpers.getAbsolutePath('dist'),
            filename: '[name].bundle.' + timer + '.js',
            sourceMapFilename: '[name].bundle.' + timer + '.map',
            chunkFilename: '[id].chunk.' + timer + '.js'
        },
        module: {
            rules: []
        },
        plugins: [
            new OptimizeJsPlugin({
                sourceMap: false
            }),
            new ExtractTextPlugin('[name].' + timer + '.css'),
            new DefinePlugin({
                'ENV': JSON.stringify("production"),
                'HMR': webpackConfig.HMR,
                'process.env': {
                    'ENV': JSON.stringify("production"),
                    'NODE_ENV': JSON.stringify("production"),
                    'HMR': webpackConfig.HMR,
                }
            }),
            new UglifyJsPlugin({
                beautify: false,
                output: {
                    comments: false
                },
                mangle: {
                    screw_ie8: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false
                },
            }),
            new NormalModuleReplacementPlugin(
                /angular2-hmr/,
                helpers.getAbsolutePath('config/webpack/empty.js')
            ),
            new NormalModuleReplacementPlugin(
                /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
                helpers.getAbsolutePath('config/webpack/empty.js')
            ),
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
};