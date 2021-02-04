const gulp = require('gulp');
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');
const { src, series, parallel, dest, watch } = require('gulp');


// Styles
function styles() {
    return gulp.src('src/css/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(prefix('last 2 versions'))
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
}



// Images Task
function images() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(livereload());
}


// Copy Html To dist
function copyHtml() {
    return src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
}

// copy Fonts Folder To dist
function copyFonts() {
    return src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(livereload());
}


// Watch Changing 
function watchTask() {
    require('./server.js');
    livereload.listen();
    gulp.watch('src/css/**/*.scss', styles);
    gulp.watch('src/images/**/*.png', images);
    gulp.watch('src/*.html', copyHtml);
    gulp.watch('src/fonts/*', copyFonts);
}

// Exports
exports.styles = styles;
exports.images = images;
exports.copyHtml = copyHtml;
exports.copyFonts = copyFonts;
exports.watchTask = watchTask;

// Default Export
exports.default = parallel(styles, images, copyHtml, copyFonts, watchTask);