/**
 * Created by drakosha on 24.07.2016.
 */
var gulp;
var gulpFilter;
var MainBowerFiles;
var concat;
var uglify;
var bower;

gulp = require("gulp");
gulpFilter = require('gulp-filter');
MainBowerFiles = require('main-bower-files');
concat = require("gulp-concat");
uglify = require("gulp-uglifyjs");
sass = require("gulp-sass");
minCss = require("gulp-minify-css");
bower = require("gulp-bower");



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

gulp.task('compBowerSassCss', function(){

    var sassFilter;
    var cssFilter;

    sassFilter = gulpFilter(['**/*.scss'], {restore: true});
    cssFilter = gulpFilter(['**/*.css'], {restore: true});

    return gulp.src(MainBowerFiles({
        "includeDev": true
    }))
        .pipe(sassFilter)
        .pipe(sass())
        .pipe(concat('externalCssLibs.min.css'))
        //.pipe(sassFilter.restore())
        .pipe(cssFilter)
        .pipe(concat('externalCssLibs.min.css'))
        .pipe(minCss())
        .pipe(gulp.dest('app/css/'));
});

gulp.task('copyBowerSass', function(){
    return gulp.src(MainBowerFiles({
        "includeDev": true
    }))
        .pipe(gulpFilter(['**/*.scss!font-awesome.scss'], {restore: true}))
        .pipe(gulp.dest('app/sass/vendors'));
});

gulp.task('compileBowerLibs', ['compBowerJs', 'compBowerSassCss', 'copyBowerSass' ,'compBowerFonts']);


gulp.task('compileSass', ['compileBowerLibs'], function(){
   return gulp.src('app/sass/**/*.+(sass|scss)')
       .pipe(sass())
       .pipe(concat('main.min.css'))
       .pipe(minCss())
       .pipe(gulp.dest('app/css/'));

});

