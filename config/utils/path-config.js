// Note: Don't change it to self-executing function as it disrupts the editor's suggest mode
module.exports = function () {
    var root = '',
        src = root + 'src/',
        config = root + 'config/',
        app = src + 'app/',
        assets = src + 'assets/',
        assetsPath = {
            styles: assets + 'styles/',
            images: assets + 'images/',
            fonts: assets + 'fonts/',
            customIcons: assets + 'custom-icons/'
        },
        index = src + 'index.html',
        tsFiles = [
            app + '**/!(*.spec)+(.ts)'
        ],
        dllPath = root + 'dll/',
        build = {
            path: 'dist/',
            app: 'dist/app/',
            fonts: 'dist/assets/fonts/',
            assets: 'dist/assets/'
        },
        requiredAssets = [
            "/assets/images/app-images",
            "/assets/images/favicon"
        ];
    var config = {
        root: root,
        config: config,
        src: src,
        app: app,
        assets: assets,
        index: index,
        build: build,
        dllPath: dllPath,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        requiredAssets: requiredAssets
    };
    return config;
};