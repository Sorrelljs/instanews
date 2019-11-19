var gulp = require('gulp'),
    terser = require("gulp-terser"),
    rename = require("gulp-rename");
    eslint = require("gulp-eslint");
let browserSync = require("browser-sync").create();

gulp.task('scripts', function(){
    //return gulp 
  return gulp.src('./js/*.js')
    .pipe(terser())
    .pipe(eslint())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))
    .pipe(eslint.format())
    .pipe(eslint.fallAfterError())
    .pipe(Terser({toplevel: true})) // call the terser function on these files
    .pipe(rename({ extname: '.min.js'})) // rename the uglifeted file
    .pipe(gulp.dest('./build/js'));

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task ("reload", function(done) {
    browserSync.reload();
    done();

});

gulp.task("watch", function() {
    gulp.watch("./js/*.js", gulp.series("scripts", "reload"));
    gulp.watch("index.html", gulp.series("reload"));

  });

  gulp.task("default", gulp.parallel("browser-sync", "watch" ));

