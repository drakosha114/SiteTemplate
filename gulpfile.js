/**
 * Created by drakosha on 24.07.2016.
 */
var gulp;
var gulpFilter;
var MainBowerFiles;
var concat;
var uglify;


gulp = require("gulp");
gulpFilter = require('gulp-filter');
MainBowerFiles = require('main-bower-files');
concat = require("gulp-concat");
uglify = require("gulp-uglifyjs");
sass = require("gulp-sass");
minCss = require("gulp-minify-css");




gulp.task('compBowerJs',function(){
    return gulp.src(MainBowerFiles({
        "includeDev": true
    }))
        .pipe(gulpFilter(('**/*.js'), {restore: true}))
        .pipe(concat('externalJsLibs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js/'));

});

gulp.task('compBowerFonts', function(){
    return gulp.src('libs/**/fonts/*.+(otf|eot|svg|ttf|woff|woff2)')
        .pipe(gulpFilter('**/*.+(otf|eot|svg|ttf|woff|woff2)'))
        .pipe(gulp.dest('app/fonts/'))

});
gulp.task('compBowerCss', function(){
    return gulp.src(MainBowerFiles({
        "includeDev": true
    }))
        .pipe(gulpFilter(['**/*.scss'], {restore: true}))
        .pipe(sass())
        .pipe(concat('externalCssLibs.min.css'))
        .pipe(minCss())
        .pipe(gulp.dest('app/css/'))
});

gulp.task('compileBowerLibs', ['compBowerJs', 'compBowerCss', 'compBowerFonts']);


gulp.task('compileSass', ['compileBowerLibs'], function(){
   return gulp.src('app/sass/**/*.+(sass|scss)')
       .pipe(sass())
       .pipe(concat('main.min.css'))
       .pipe(minCss())
       .pipe(gulp.dest('app/css/'));

});

