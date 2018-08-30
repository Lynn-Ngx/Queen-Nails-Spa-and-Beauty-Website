/**
 * https://github.com/sogko/gulp-recipes/blob/master/browserify-separating-app-and-vendor-bundles/gulpfile.js
 * https://gist.github.com/Fishrock123/8ea81dad3197c2f84366
 * https://stackoverflow.com/questions/42633716/unexpected-token-punc-expected-punc-when-creating-chunk-from-uglifyjs
 */

const gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    merge = require('utils-merge'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    forever = require('gulp-forever-monitor'),
    path = require('path'),
    colors = require('colors/safe'),
    fs = require('fs'),
    gulpif = require('gulp-if'),
    gulpArguments = require('yargs').argv,
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    manifest = JSON.parse(fs.readFileSync('manifest.json'))

function map_error(err) {
    if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.fileName.replace(__dirname + './public/app/app.js', ''))
            + ': '
            + 'Line '
            + chalk.magenta(err.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(err.columnNumber || err.column)
            + ': '
            + chalk.blue(err.description))
    } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message))
    }

    this.end()
}

gulp.task('less', () => {
    gulp.src(['./public/assets/css/*.less', './public/app/views/directives/*/*.less', './public/app/views/pages/*/*.less'])
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/assets/css'))
})

gulp.task('watch:less', ['less'], function() {

    gulp.watch(['./public/assets/css/*.less', './public/app/views/directives/*/*.less', './public/app/views/pages/*/*.less'], ['less']);  // Watch all the .less files, then run the less task
});


gulp.task('browserify:bundle', function () {
    var args = merge(watchify.args, { debug: true })
    var bundler = watchify(browserify(manifest.browserify.bundle.files[0], args))

    manifest.browserify.vendor.dependencies.forEach(lib => {
        bundler.external(lib)
    })

    bundle_js(bundler, false, true)

    bundler.on('update', function () {
        bundle_js(bundler, false, true)
    })
})

gulp.task('browserify:vendor', function(done) {
    const b = browserify({
        debug: true
    })

    manifest.browserify.vendor.dependencies.forEach(lib => {
        b.require(lib);
    });

    b.bundle()
        .pipe(source(manifest.browserify.vendor.filename))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(manifest.browserify.vendor.folder))
        .on('end', () => done());
});

gulp.task('start:server',  ['browserify:vendor', 'browserify:bundle', 'watch:less'], function() {
    const gulpArguments = require('yargs').argv;
    const appArguments = [ 'server.js'];
    if (gulpArguments.dev) appArguments.push('dev');

    // Ignore the browserified files from restarting the server.
    const watchIgnorePatterns = manifest.browserify.ignore
    watchIgnorePatterns.push(manifest.browserify.vendor.filename);
    watchIgnorePatterns.push(manifest.browserify.bundle.filename);

    localApp = forever(path.resolve('server.js'),
        {
            command: 'node',
            silent: false,
            watch: true,
            watchIgnoreDotFiles: true,
            watchIgnorePatterns: watchIgnorePatterns,
            watchDirectory: path.resolve('.'),
            args: appArguments
        })
        .on('exit', function () {
            console.log('application server was stopped');
        })
        .on('watch:restart', function (info) {
            console.log(colors.yellow('Restarting script because ' + JSON.stringify(info) + ' changed'));
        });
});

gulp.task('bundle-for-production',['browserify:vendor', 'watch:less'] ,() => {
    var bundler = (browserify(manifest.browserify.bundle.files[0]))
        // .transform("babelify", {
        //     global: true,
        //     // only: /^(?:.*\/node_modules\/(?:a|b)\/|(?!.*\/node_modules\/)).*$/,
        //     presets: ["es2015", "env"]
        // })

    manifest.browserify.vendor.dependencies.forEach(lib => {
        bundler.external(lib)
    })

    bundle_js(bundler, false, false)
})

function bundle_js(bundler, uglifyBundle, mapBundle) {
    return bundler.bundle()
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(source(manifest.browserify.bundle.files[0]))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(buffer())
        .pipe(rename('bundle.js'))
        .pipe(gulpif(mapBundle, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(uglifyBundle, uglify()))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulpif(mapBundle, sourcemaps.write('.')))
        .pipe(gulp.dest('./public/assets/js'))


}
