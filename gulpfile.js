var gulp = require('gulp'),
    requireDir = require('require-dir'),
    runSequence = require('run-sequence');

// Importing all the tasks from config/gulp directory
requireDir('./config/gulp');

// Can't run watch with gulp here as it will block the current thread and not let run webpack
// Note: Need to run it as independent process
gulp.task('default', function(done) {
    runSequence('clean', 'copy-resources', ['custom-fonts', 'sprite'], done);
});