// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cssmin = require('gulp-cssmin');
var uncss = require('gulp-uncss');
var htmlmin = require('gulp-htmlmin');
var inlinesource = require('gulp-inline-source');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('source/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('source/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('production'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('production/js'));
});

// Images
gulp.task('images', function () {
    return gulp.src('source/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('production/img'));
});

// Images
gulp.task('images2', function () {
    return gulp.src('source/views/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('production/views/images'));
});


// CSS
gulp.task('css', function () {
    gulp.src('source/css/*.css')
        .pipe(uncss({
            html: ['source/index.html', 'source/views/pizza.html']
        }))
        .pipe(cssmin())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('production/css'));
});

gulp.task('html', function() {
  return gulp.src('source/*.html')
    .pipe(inlinesource())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('production/'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('*.html', ['html']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch', 'images', 'images2', 'css', 'html']);
