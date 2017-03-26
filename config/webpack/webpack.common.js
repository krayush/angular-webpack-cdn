var webpack = require('webpack');
var helpers = require('../utils/helpers');
var webpackConfig = require('../utils/webpack-config')();
var pathConfig = require('../utils/path-config')();

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var ngcWebpack = require('ngc-webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Note: Loaders load from bottom to top and right to left
module.exports = function () {
    var requiredAssets = [];
    pathConfig.requiredAssets.map(function(item) {
        requiredAssets.push({
            from: helpers.getAbsolutePath('src' + item),
            to: helpers.getAbsolutePath('dist' + item)
        })
    });
    return {
        entry: webpackConfig.entryPoints,
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [
                helpers.getAbsolutePath('src'),
                helpers.getAbsolutePath('node_modules')
            ]
        },
        module: {
            rules: [{
                test: /\.ts$/,
                use: [{
                    // Required for lazy loading of modules
                    loader: 'ng-router-loader',
                    options: {
                        loader: 'async-import',
                        genDir: 'compiled',
                        aot: webpackConfig.AOT
                    }
                }, {
                    // TypeScript compiler
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.webpack.json'
                    }
                }, {
                    // Embedding the HTML and CSS files
                    loader: 'angular2-template-loader'
                }]
            }, {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }, {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader'
            }, {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [helpers.getAbsolutePath('src/assets/styles')]
            }, {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: [helpers.getAbsolutePath('src/assets/styles')]
            }, {
                test: /\.json$/,
                use: 'json-loader'
            }, {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [helpers.getAbsolutePath('src/index.html')]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                }),
                include: [helpers.getAbsolutePath('src/assets/styles')]
            }]
        },
        plugins: [
            new AssetsPlugin({
                path: helpers.getAbsolutePath('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),
            new CheckerPlugin(),
            new CopyWebpackPlugin(requiredAssets),
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),
            // This enables tree shaking of the vendor modules
            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['main'],
                minChunks: module => /node_modules/.test(module.resource)
            }),
            // Specify the correct order the scripts will be injected in
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            // location of your src
            // your Angular Async Route paths relative to this root directory
            new ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.getAbsolutePath('src'), {}
            ),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new ExtractTextPlugin('[name].css'),
            new HtmlWebpackPlugin({
                template: helpers.getAbsolutePath('src/index.html'),
                title: webpackConfig.pageInfo.title,
                chunksSortMode: 'dependency',
                //inject: 'head',
                inject: false,
                metadata: {
                    baseURL: webpackConfig.pageInfo.baseURL,
                    faviconPath: webpackConfig.pageInfo.faviconPath,
                    isDevServer: helpers.isWebpackDevServer(),
                    HMR: webpackConfig.HMR
                }
            }),
            // AOT Compiling
            new ngcWebpack.NgcWebpackPlugin({
                disabled: !webpackConfig.AOT,
                tsConfig: helpers.getAbsolutePath('tsconfig.webpack.json')
            })
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
};