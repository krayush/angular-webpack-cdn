var gulp = require('gulp');
var config = require('../utils/path-config')();
var rimraf = require('gulp-rimraf');
var merge = require('merge-stream');
var _ = require('lodash');

gulp.task('clean', ['clean-generated-fonts'], function () {
    return gulp.src([
        config.build.path,
        config.dllPath,
        config.app + '**/*.css',
        config.assetsPath.styles + '**/*.css',
        config.assetsPath.images + 'sprite-dist/'
    ], {
        read: false
    })
        .pipe(rimraf());
});

// Clean all generated/copied fonts from the fonts directory
gulp.task('clean-generated-fonts', function () {
    var paths = [];
    // Deleting custom fonts generated by webfont task
    paths.push(config.assetsPath.fonts + 'custom-fonts');
    // Deleting copied fonts folders
    _.forOwn(config.externalFonts, function(value, key) {
        paths.push(config.assetsPath.fonts + key + "/");
    });
    return gulp.src(paths, {
        read: false
    })
        .pipe(rimraf());
});