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
        externalFonts = {
            'font-awesome': 'node_modules/font-awesome/fonts/*.*',
            'bootstrap': 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.*'
        },
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
    var gulpConfig = {
        root: root,
        config: config,
        src: src,
        app: app,
        externalFonts: externalFonts,
        assets: assets,
        index: index,
        build: build,
        dllPath: dllPath,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        requiredAssets: requiredAssets
    };
    return gulpConfig;
};