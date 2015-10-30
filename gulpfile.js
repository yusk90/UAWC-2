'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    //pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync').create(),
    replace = require('gulp-replace'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    spritesmith = require('gulp.spritesmith'),
    clean = require('del'),
    distPath = 'dist';


// Clean dist
gulp.task('clean', function () {
    clean([distPath]);
});

// Replace
gulp.task('replace', function(){
    gulp.src(['fonts/**/*.*'])
        .pipe(replace('bar', 'foo'))
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src(['vendor/**/*.*'])
        .pipe(replace('bar', 'foo'))
        .pipe(gulp.dest('./dist/vendor'));
});

// LESS
gulp.task('less', function () {
    gulp.src(['less/*.less','!less/import/*.*'])
        .pipe(less())
        .pipe(gulp.dest('css/'))
});

// CSS
gulp.task('css', function() {
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Dependencies
gulp.task('deps-js', function () {
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/underscore/underscore-min.js',
        'bower_components/backbone/backbone-min.js',
        'node_modules/backbone.localstorage/backbone.localStorage-min.js',
        'node_modules/dragula/dist/dragula.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('deps-css', function () {
    gulp.src([
        'bower_components/normalize-css/normalize.css',
        'node_modules/dragula/dist/dragula.min.css'
    ])
        .pipe(concatCss('libs.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

// JS
gulp.task('js', function() {
    gulp.src([
        'js/frontend/init.js',
        'js/frontend/models/UserModel.js',
        'js/frontend/collections/UsersCollection.js',
        'js/frontend/views/BaseView.js',
        'js/frontend/views/RegistrationView.js',
        'js/frontend/views/SigninView.js',
        'js/frontend/views/ThemesView.js',
        'js/frontend/app.js',
        'js/main.js'
    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    gulp.src([
        'js/frontend/init.js',
        'js/frontend/models/UserModel.js',
        'js/frontend/collections/UsersCollection.js',
        'js/frontend/views/BaseView.js',
        'js/frontend/views/BaseWidgetView.js',
        'js/frontend/views/EditWidgetView.js',
        'js/frontend/views/H1WidgetView.js',
        'js/frontend/views/H2WidgetView.js',
        'js/frontend/views/BlockquoteWidgetView.js',
        'js/frontend/views/ParagraphWidgetView.js',
        'js/frontend/views/WellWidgetView.js',
        'js/frontend/views/HrWidgetView.js',
        'js/frontend/views/ImageWidgetView.js',
        'js/frontend/views/ImageTextWidgetView.js',
        'js/frontend/views/GalleryWidgetView.js',
        'js/frontend/views/VideoWidgetView.js',
        'js/frontend/views/CounterWidgetView.js',
        'js/frontend/views/ButtonWidgetView.js',
        'js/frontend/views/SocialShareWidgetView.js',
        'js/frontend/views/SocialLikeWidgetView.js',
        'js/frontend/views/FooterWidgetView.js',
        'js/frontend/views/MapWidgetView.js',
        'js/frontend/views/MenuWidgetView.js',
        'js/frontend/views/ContactsWidgetView.js',
        'js/frontend/views/ConstructorView.js',
        'js/frontend/app.js',
        'js/main.js'
    ])
        .pipe(concat('constructor-script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// HTML
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(gulp.dest('dist/'))
});

// Sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('images/small_icon/*.png').pipe(spritesmith({
        imgName: '../images/sprite.png',
        cssName: 'sprite.css'
    }));
    var imgStream = spriteData.img
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
    var cssStream = spriteData.css
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/'))
});

// Images compress
gulp.task('images', function () {
    gulp.src(['images/**/*.*','!images/small_icon/*.*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
            //use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        browser: 'google-chrome'
    });
    gulp.watch('less/*.less', ['less']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

// Watch
gulp.task('watch', function() {
    gulp.watch('css/*.css', ['css']);
    gulp.watch('*.html', ['html']);
    gulp.watch('less/**/*.less', ['less']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch(['js/**/*.js', 'js/**/**/*.js'], ['js']);
});

// Default task
gulp.task('default', ['clean', 'deps-js', 'deps-css', 'replace', 'html', 'js', 'css', 'sprite', 'images', 'browser-sync', 'watch']);
