
/* requires */
var gulp = require('gulp'),
fileinclude = require('gulp-file-include'),
template = require('gulp-template'),
webserver = require('gulp-webserver'),
RevAll = require('gulp-rev-all'),
uglify = require('gulp-uglify'), 
filter = require('gulp-filter'),  
csso = require('gulp-csso'),
minifyCss = require('gulp-minify-css'),
gulpif = require('gulp-if'),
rename = require('gulp-rename'),
livereload = require('gulp-livereload'),
minifyHtml = require("gulp-minify-html"),
useref = require('gulp-useref'),
imagemin = require('gulp-imagemin'),
imageminJpegRecompress = require('imagemin-jpeg-recompress'),
imageminOptipng = require('imagemin-optipng'),
pngquant = require('imagemin-pngquant'); // 深度压缩

/* tasks */
gulp.task('server', function() {
	gulp.src('src').pipe(webserver({
        port: '8080',
  		fallback: 'index.html'
	}));
});

gulp.task('minHTML', function() {
    gulp.src('src/index.html') // 要压缩的html文件
    .pipe(minifyHtml()) //压缩
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('minify-css', function () {
    gulp.src('src/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', function () {
    gulp.src('src/*.js') // 要压缩的js文件
    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist')); //压缩后的路径
});

gulp.task('compile-less', function () {
    gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compile-sass', function () {
    gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

// 自动刷新
gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

//图片压缩任务,支持JPEG、PNG及GIF文件;
//命令行使用gulp jpgmin启用此任务;
// gulp.task('imgmin', function() {
//     var jpgmin = imageminJpegRecompress({
//             accurate: true,//高精度模式
//             quality: "medium",//图像质量:low, medium, high and veryhigh;
//             method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
//             min: 70,//最低质量
//             loops: 0,//循环尝试次数, 默认为6;
//             progressive: false,//基线优化
//             subsample: "default"//子采样:default, disable;
//         }),
//         pngmin = imageminOptipng({
//             optimizationLevel: 3
//         });
//     gulp.src('src/imgs/*.*')
//         .pipe(imagemin({
//             use: [jpgmin, pngmin]
//         }))
//         .pipe(gulp.dest('dist/imgs'));
// });

// imagemin 图片压缩（利用cache）
gulp.task('imgmin', function(){
  return gulp.src('src/imgs/**/*.{png,jpg,gif,svg}') // 指明源文件路径、并进行文件匹配
    .pipe(imagemin({
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{removeViewBox: false}], // 不要移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('dist/imgs')); // 输出路径
});
// // 清理缓存文件
// gulp.task('clean', function (done) {
//   return cache.clearAll(done);
// });

gulp.task('watch', function() {

  livereload.listen(); //要在这里调用listen()方法
  gulp.watch('src/*.js', ['minify-js']);
  gulp.watch('src/*.css', ['minify-css']);
  gulp.watch('src/index.html', ['minHTML']);
});

gulp.task('default', function() {
    // 压缩代码
	gulp.start('minHTML');
    gulp.start('minify-css');
    gulp.start('minify-js');
    gulp.start('imgmin');

    // 实时更新并压缩代码
    gulp.start('watch');

    // 调试运行
    // gulp.start('server');
});