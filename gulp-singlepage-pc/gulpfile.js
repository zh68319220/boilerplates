var gulp         = require('gulp'),
    assetRev     = require('gulp-asset-rev'),
    runSequence  = require('run-sequence'),
    rev          = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    uglify       = require('gulp-uglify'),
    cssmin       = require('gulp-minify-css'),
    clean        = require('gulp-clean'),
    htmlmin      = require('gulp-htmlmin');

//定义源文件和目标文件路径
var cssSrc  = 'src/static/css/*.css',
    jsSrc   = 'src/static/js/*.js',
    imgSrc  = 'src/static/imgs/*.*',
    fontSrc = 'src/static/font/*.*',
    destJs  = 'dist/static/js',
    destCss = 'dist/static/css',
    destImg = 'dist/static/imgs',
    destFont= 'dist/static/font';

// 为css和js中引入的图片/字体等添加hash编码
gulp.task('assetRevCss', function(){
    return gulp.src(['rev/**/*.json', destCss + '/*.css'])
      .pipe(revCollector())
      .pipe(gulp.dest('dist/static/css'));
});
gulp.task('assetRevJs', function(){
    return gulp.src(['rev/**/*.json', destJs + '/*.js'])
      .pipe(revCollector())
      .pipe(gulp.dest('dist/static/js'));
});

// CSS
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(cssmin())
        .pipe(gulp.dest(destCss))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

// 字体
gulp.task('revFont', function(){
    return gulp.src(fontSrc)
        .pipe(rev())
        .pipe(gulp.dest(destFont))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/font'));
});

// 图片
gulp.task('revImg', function(){
    return gulp.src(imgSrc)
        .pipe(rev())
        .pipe(gulp.dest(destImg))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/img'));
});

// js
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest(destJs))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

// Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'src/*.html'])
        .pipe(revCollector())
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist'));
});

// 复制模拟数据
gulp.task('copyData', function () {
    return gulp.src('src/data/*.json')
        .pipe(gulp.dest('dist/data'));
});

//清空打包文件夹
gulp.task('clean', function (){
  return gulp.src('dist', {read: false})
      .pipe(clean());
});

//开发构建
gulp.task('build', function (done) {
    condition = false;
    runSequence(
        ['clean'],
        ['revCss'],
        ['revJs'],
        ['revImg'],
        ['revFont'],
        ['assetRevCss'],
        ['assetRevJs'],
        ['revHtml'],
        ['copyData'],
        done);
});

// var gulp         = require('gulp'),
//     uglify       = require('gulp-uglify'),
//     cssmin       = require('gulp-minify-css'),
//     clean        = require('gulp-clean'),
//     htmlmin      = require('gulp-htmlmin'),
//     assetRev     = require('gulp-asset-rev');

// gulp.task('build', ['copy-font', 'copy-img', 'copy-data', 'minifycss', 'minifyjs', 'minifyhtml']);

// gulp.task('rev',['revCss'],function() {
//     gulp.src("./src/index.html")
//         .pipe(assetRev())
//         .pipe(gulp.dest('./dist'));
// });
 
// gulp.task('revCss',function () {
//     return gulp.src('./src/static/css/*.css')
//         .pipe(assetRev())
//         .pipe(cssmin())
//         .pipe(gulp.dest('./dist/static/css/'))
// });

// gulp.task('revAll',['rev']);

// gulp.task('copy-font',  function() {
//   return gulp.src('src/static/font/*')
//     .pipe(gulp.dest('dist/static/font'))
// });

// gulp.task('copy-img',  function() {
//   return gulp.src('src/static/imgs/*')
//     .pipe(gulp.dest('dist/static/imgs'))
// });

// gulp.task('copy-data',  function() {
//   return gulp.src('src/data/*')
//     .pipe(gulp.dest('dist/data'))
// });

// gulp.task('minifycss', function(){
//     return gulp.src('src/static/css/*.css')
//             .pipe( cssmin() )
//             .pipe( gulp.dest( 'dist/static/css' ) );
// });

// gulp.task('minifyjs', function(){
// 	return gulp.src('src/static/js/*.js')
//             .pipe( uglify() )
//     	    .pipe(gulp.dest( 'dist/static/js' ));
// });

// gulp.task('minifyhtml', function(){
//     var options = {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeEmptyAttributes: true,
//         removeScriptTypeAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         minifyJS: true,
//         minifyCSS: true
//     };
//     gulp.src('src/*.html')
//         .pipe(htmlmin(options))
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('clean', function (){
//   return gulp.src('dist', {read: false})
//       .pipe(clean());
// });