var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('open');
var sequence = require('run-sequence');
var concat = require('gulp-concat');
var del = require('del');
var resolve = require('bower-resolve');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var htmlreplace = require('gulp-html-replace');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');

// images

gulp.task('images', function() {
    return gulp.src(['./app/images/*'])
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('build/images'));
});

// scripts

var dependencies = require('./bower.json').dependencies;

resolve.offline = true;

gulp.task('scripts', function() {

    resolve.init(function () {

        var bundler = browserify();

        for (var pkg in dependencies) {
            bundler.require(resolve(pkg), { expose: pkg });
        }

        bundler.bundle()
            .pipe(source('vendor.min.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build/'));

    });

    resolve.init(function () {

        var bundler = browserify({
            basedir: './app',
            entries: ['./scripts/app.js'],
            debug: true
        }).on('error', gutil.log);

        for (var pkg in dependencies) {
            bundler.external(pkg);
        }

        bundler
            .transform(reactify)
            .bundle()
            .pipe(source('scripts.min.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build/'));

    });

});

// styles

gulp.task('styles', function() {
    return gulp.src(['./app/styles/normalize.css', './app/styles/main.css'])
        .pipe(concat('styles.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('build/'));
});

// html

gulp.task('html', function() {

    gulp.src('app/*.html')
        .pipe(htmlreplace({
            styles: 'styles.min.css',
            vendor: 'vendor.min.js',
            scripts: 'scripts.min.js'
        }))
        .pipe(gulp.dest('build/'));

});

// build

gulp.task('clean', function(callback) {
    del(['tmp/**/*', 'build/**/*'], callback);
});

gulp.task('build', function(callback) {
    sequence('clean', ['images', 'scripts', 'html', 'styles'], callback);
});

gulp.task('server', ['build'], function() {
    connect.server({
        root: 'build',
        port: 8888
    });
    open('http://localhost:8888');
});

gulp.task('default', ['build']);