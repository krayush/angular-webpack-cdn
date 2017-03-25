var gulp = require('gulp');
var config = require('../utils/path-config')();
var iconFontCSS = require('gulp-iconfont-css');
var iconFont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now()/1000);

// Task for generating fonts from SVGs
// fontPath should be relative from the location of main.css in build directory
gulp.task('custom-fonts', function() {
    var fontName = 'icons';
    return gulp.src(config.assetsPath.customIcons + '*.svg')
        .pipe(iconFontCSS({
            fontName: fontName,
            fontPath: "../fonts/custom-fonts/",
            // path relative to gulp.dest
            targetPath: '../../styles/_icons.scss'
        }))
        .pipe(iconFont({
            fontName: fontName,
            prependUnicode: true, // recommended option
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize: true,
            timestamp: runTimestamp // recommended to get consistent builds when watching files
        }))
        .pipe(gulp.dest(config.assetsPath.fonts + 'custom-fonts/'));
});