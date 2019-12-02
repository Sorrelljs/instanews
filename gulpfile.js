let gulp = require('gulp'),
    terser = require("gulp-terser"),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    cssnano = require("gulp-cssnano"),
    autoprefixer = require("gulp-autoprefixer"),

    eslint = require("gulp-eslint");

let browserSync = require("browser-sync").create();

gulp.task('scripts', function(){
    //return gulp 
  return gulp.src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser({toplevel: true})) // call the terser function on these files
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


gulp.task('sass' , function() {
    return gulp
    .src('./sass/styles.scss')
    .pipe(sass())
    //plugins
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css'));
    
});



gulp.task ("reload", function(done) {
    browserSync.reload();
    done();

});

gulp.task("watch", function() {
    gulp.watch("./js/*.js", gulp.series("scripts", "reload"));
    gulp.watch("./sass/*.scss", gulp.series("sass", "reload"));
    gulp.watch("index.html", gulp.series("reload"));

  });

  gulp.task("default", gulp.parallel("browser-sync", "watch" ));

