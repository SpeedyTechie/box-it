var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');

gulp.task('css', function() {
    return gulp.src('style.css')
        .pipe(autoprefixer({browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not ie <= 8']}))
        .pipe(rename('box-it.css'))
        .pipe(gulp.dest('dist'))
        .pipe(cleancss({roundingPrecision: -1, rebase: false, processImport: false}))
        .pipe(rename('box-it.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src('script.js')
        .pipe(rename('box-it.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('box-it.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('style.css', ['css']);
    gulp.watch('script.js', ['js']);
});

gulp.task('default', ['css', 'js', 'watch']);