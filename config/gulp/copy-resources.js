var gulp = require('gulp');
var config = require('../utils/path-config')();
var _ = require('lodash');
var merge = require('merge-stream');

gulp.task('copy-external-fonts', function () {
    var tasks = [];
    _.forOwn(config.externalFonts, function(value, key) {
        tasks.push(gulp.src(value).pipe(gulp.dest(config.assetsPath.fonts + key)));
    });
    return merge(tasks);
});

gulp.task('copy-resources', ['copy-external-fonts']);