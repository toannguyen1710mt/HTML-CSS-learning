var gulp = require('gulp'),
  connect = require('gulp-connect');
  var sass = require('gulp-sass');

  sass.compiler = require('node-sass');
  var rewrite = require('http-rewrite-middleware');
 
gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 4000,
    livereload: true,
    middleware: function() {
      return [ rewrite.getMiddleware([
        { from: '^/images/(.*)$', to: '/images/$1' }
      ])];
    }
  });
});
 
gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['index.html', 'style.scss'], ['html', 'sass']);
});
 
gulp.task('sass', function () {
  return gulp.src('style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});
 
gulp.task('default', ['connect', 'watch']);