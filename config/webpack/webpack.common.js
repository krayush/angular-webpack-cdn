const webpack = require('webpack');
const helpers = require('../utils/helpers');
const webpackConfig = require('../utils/webpack-config')();
const pathConfig = require('../utils/path-config')();
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ngcWebpack = require('ngc-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Note: Loaders load from bottom to top and right to left
module.exports = function () {
    var isWebpackDevServer = helpers.isWebpackDevServer();
    var requiredAssets = [];
    var devPlugins = [];
    if(isWebpackDevServer) {
        devPlugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false
        }));
    }
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
            }, {
                test: /webfont\.config\.js/,
                use: [
                    'style-loader',
                    'css-loader',
                    'webfonts-loader'
                ]
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
                    isDevServer: isWebpackDevServer,
                    HMR: webpackConfig.HMR
                }
            }),
            // AOT Compiling
            new ngcWebpack.NgcWebpackPlugin({
                disabled: !webpackConfig.AOT,
                tsConfig: helpers.getAbsolutePath('tsconfig.webpack.json')
            }),
            new CleanWebpackPlugin([
                pathConfig.build.path,
                pathConfig.dllPath,
                pathConfig.app + '**/*.css',
                pathConfig.assetsPath.styles + '**/*.css',
                pathConfig.assetsPath.images + 'sprite-dist/'
            ]),
            ...devPlugins
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