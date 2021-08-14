const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const del = require('del');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('scripts', () => gulp.src('scripts.js').pipe(uglify({ 
    compress: true, 
    mangle: true 
})).pipe(rename('scripts.min.js')).pipe(gulp.dest('assets/js')).pipe(gulp.dest('../../../preview/assets/js')));

gulp.task('styles', () => gulp.src('styles.scss').pipe(sass({
    outputStyle: 'compressed'
}).on('error', sass.logError))
    .pipe(rename('main.css')).pipe(gulp.dest('assets/css'))
    .pipe(rename('styles.css')).pipe(gulp.dest('assets/css'))
    .pipe(rename('main.css')).pipe(gulp.dest('../../../preview/assets/css'))
    .pipe(rename('styles.css')).pipe(gulp.dest('../../../preview/assets/css'))
);

gulp.task('reset', () => del(['assets/js/scripts.min.js', 'assets/css/main.css', 'assets/css/styles.css']));

gulp.task('watch', () => gulp.watch(['assets/scss/*.scss', 'styles.scss', 'scripts.js'], gulp.series(['build'])));

gulp.task('build', gulp.series(['reset', 'scripts', 'styles']));

gulp.task('dev', gulp.series(['build', 'watch']));

gulp.task('default', gulp.series(['dev']));