var helpers = require("../utils/helpers");

// Note: Don't change it to self-executing function as it disrupts the editor's suggest mode
module.exports = function () {
    var entryPoints = {
        'polyfills': helpers.getAbsolutePath('src/polyfills.browser.ts'),
        'main': helpers.getAbsolutePath(
            helpers.hasNpmFlag('aot')?'src/main.browser.aot.ts':'src/main.browser.ts'
        ),
        // use [x].style for all the css files to name them: [x].style.css
        'app.style': helpers.getAbsolutePath("src/assets/styles/main.ts"),
        'vendor.style': helpers.getAbsolutePath("src/assets/styles/vendor.ts")
    },
        devServerConfig = {
            port: process.env.PORT || 3000,
            host: process.env.HOST || 'localhost',
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                    poll: 1000
            },
            historyApiFallback: {
                index: 'src/index.html'
            }
        },
        externalAssetsConfig = {
            "jsAssets": [
                "dist/polyfills.dll.{hash}js",
                "dist/vendor.dll.{hash}js",
                "dist/polyfills.bundle.{hash}js",
                "dist/vendor.bundle.{hash}js",
                "dist/main.bundle.{hash}js"
            ],
            "cssAssets": [
                "dist/app.style.{hash}css"
            ]
        },
        pageInfo = {
            title: "title"
        };
    var webpackConfig = {
        entryPoints: entryPoints,
        devServerConfig: devServerConfig,
        pageInfo: pageInfo,
        HMR: helpers.hasProcessFlag('hot'),
        AOT: helpers.hasNpmFlag('aot'),
        externalAssetsConfig: externalAssetsConfig
    };
    return webpackConfig;
};