var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    connect = require('gulp-connect');

var assets = require("gulp-assets");
 
gulp.src("./src/*.html")
    .pipe(assets({
        js: true,
        css: true
    }))
    .pipe(gulp.dest("./dist"));

gulp.task('connect',function(){
  connect.server({
  root: 'src',
  livereload: true
  });
});

gulp.task('default', ['webserver','livereload','connect','watch']);

gulp.task('jshint', function() {
  return gulp.src('src/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('docs/assets/stylesheets'));
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(connect.reload())
    .pipe(gulp.dest('docs'))
    .pipe(gulp.dest('src'))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*.png')
        .pipe(gulp.dest('docs/assets/images'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/javascript/**/*.js', ['jshint']);
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/index.html/**/*.html', ['html']);
  gulp.watch('src/images/**/*.png', ['images']);
});

gulp.task('webserver',function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('livereload',function(){
  gulp.src('src')
    .pipe(connect.reload());
});