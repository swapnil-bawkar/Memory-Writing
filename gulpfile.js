/**
 * Created by Swapnil Bawkar on 9/28/2015.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var gulpConfig = require('./gulp/config.js');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var compass = require('gulp-compass');
var ngHtml2Js = require('browserify-ng-html2js');
var uglify = require('gulp-uglify');
var production = false;

gulp.task('serve', function(callback) {
    runSequence('clean', 'index', 'compass', 'material-css', 'images', 'js', 'copy', 'watch', callback);
});

gulp.task('production', function(callback) {
    production = true;
    runSequence('clean', 'index', 'compass', 'material-css', 'images', 'js', 'copy', 'uglify', callback);
});

gulp.task('uglify', function() {
    return gulp.src(gulpConfig.bundleDestination + gulpConfig.bundleName)
        .pipe(uglify())
        .pipe(gulp.dest(gulpConfig.bundleDestination));
});

gulp.task('copy', function() {
    return gulp.src('./activities/**/*')
        .pipe(gulp.dest(gulpConfig.dist + "/activities"));
});

function bundle(bundler) {
    return bundler
        .transform(babelify)
        .transform(ngHtml2Js({
            module: 'templates' // optional module name
        }))
        .bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source(gulpConfig.bundleName))
        .pipe(gulp.dest(gulpConfig.bundleDestination))
        .pipe(browserSync.stream());
}

gulp.task('watch', function() {
	gulp.watch([gulpConfig.appDir + '**/*.js', gulpConfig.appDir + '**/*.html'], ['js']);
    gulp.watch(gulpConfig.src + 'index.html', ['index']);
    gulp.watch(gulpConfig.sassDir + '**/*.scss', ['compass']);
    gulp.watch(gulpConfig.imagePath, ['images']);

    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 80
    });
});

gulp.task('material-css', function() {
    return gulp.src(gulpConfig.materialCss)
        .pipe(gulp.dest(gulpConfig.distCssPath));
});

gulp.task('images', function() {
    return gulp.src(gulpConfig.imagePath)
        .pipe(gulp.dest(gulpConfig.imageDistPath));
});

gulp.task('lint', function () {
    return gulp.src([gulpConfig.src + '**/*.js', '!./src/app/common/jsonxml/xml2json.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('compass', function() {
    gulp.src(gulpConfig.sassDir + '**/*.scss')
        .pipe(compass({
            config_file: gulpConfig.configRbPath,
            css: gulpConfig.distCssPath,
            sass: gulpConfig.sassDir,
            style: production ? 'compressed' : 'expanded'
        }))
        .pipe(browserSync.stream());
});

gulp.task('js', ['lint'], function () {
    return bundle(browserify(gulpConfig.appFile, {debug: !production}));
});

gulp.task('index', function() {
    return gulp.src(gulpConfig.appIndexFile)
        .pipe(gulp.dest(gulpConfig.dist))
        .pipe(browserSync.stream());
});

gulp.task('clean', function () {
    return gulp.src(gulpConfig.dist, {read: false})
        .pipe(clean());
});
