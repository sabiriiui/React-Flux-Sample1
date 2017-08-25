
var gulp = require('gulp');//The streaming build system

var browserify = require('browserify');//to bundle file

var babelify = require('babelify');//to transform from ES6 to ES5

var glob = require('glob');//Match files using the patterns the shell uses

var source = require('vinyl-source-stream');//Use conventional text streams at the start of your gulp pipelines

var sourcemaps = require('gulp-sourcemaps');//Source map support for Gulp.js

var buffer = require('vinyl-buffer');//Creates a transform stream that takes vinyl files as input, and outputs modified
    // vinyl files as output
var concat = require('gulp-concat');
var sass = require('gulp-sass');//Gulp plugin for sass

var output_dir = './bundle';

var outputFileName = "bundle.js";

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('build', [
    'buildJS',
    'styles']);

gulp.task('buildJS', function(){

	var entries = glob.sync(
		'./sourceJS/**/*.js'
	);
	var bundler = browserify({
        entries: entries,
        debug: true,
        cache: {},
        packageCache: {},
    }).transform("babelify", {presets: ["es2015", "react"]});

		bundler.bundle()
		.pipe(source(outputFileName))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(output_dir));

});

gulp.task('styles', function () {
    return gulp
        .src("./sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('bundleStyle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output_dir))

});
