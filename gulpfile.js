var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded',includePaths: ['node_modules']}).on('error', sass.logError)) // Using gulp-sass
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch',['browserSync', 'sass'], function(){
  gulp.watch('sass/**/*.scss', ['sass']); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
});

gulp.task('images', function(){
  return gulp.src('images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('public/images'))
});

gulp.task('clean:public', function() {
  return del.sync('public');
});

gulp.task('build', [`sass`, `images`], function (){
  console.log('Building files');
})