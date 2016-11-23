'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch');

gulp.task('sass', function () {
    return gulp.src('./src/sass/site.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('combine',function(){
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './src/js/*.js'
    ])
    .pipe(concat('full.js'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('sass:watch', function () {
    gulp.watch([
        './src/sass/site.scss',
    ], ['sass']);
});

gulp.task('js:watch', function () {
    gulp.watch([
        './src/js/*.js',
    ],['combine']);
});

gulp.task('files.copy', function() {
    gulp.src([
        './node_modules/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('./build/fonts'))
});

gulp.task('watch',['sass','combine','js:watch','sass:watch']);

gulp.task('default',['sass','combine','files.copy']);