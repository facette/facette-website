"use strict";

var fs = require('fs'),
    gulp = require('gulp'),
    chmod = require('gulp-chmod'),
    concat = require('gulp-concat'),
    environments = require('gulp-environments'),
    footer = require('gulp-footer'),
    header = require('gulp-header'),
    htmlmin = require('gulp-htmlmin'),
    myth = require('gulp-myth'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    vendor = require('gulp-concat-vendor');

var config = {
    pkg: JSON.parse(fs.readFileSync('./bower.json')),
    banner:
        '/*!\n' +
        ' * <%= pkg.name %> - <%= pkg.description %>\n' +
        ' * Website: <%= pkg.homepage %>\n' +
        ' */\n',
    files: {
        script: [
            'src/js/overlay.js',
        ],
        style: [
            'src/css/font.css',
            'src/css/common.css',
            'src/css/header.css',
            'src/css/content.css',
            'src/css/footer.css',
            'src/css/menu.css',
            'src/css/overlay.css'
        ],
        html: [
            'src/html/index.html'
        ],
        vendor: {
            js: [
                'vendor/bower_components/jquery/dist/jquery.min.js'
            ],
            css: [
                'vendor/bower_components/font-awesome/css/font-awesome.min.css'
            ],
            fonts: [
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.eot',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.svg',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.woff',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.woff2',
                'vendor/bower_components/roboto-googlefont/Roboto-Light.ttf',
                'vendor/bower_components/roboto-googlefont/Roboto-Medium.ttf',
                'vendor/bower_components/roboto-googlefont/Roboto-Regular.ttf'
            ],
            images: [
                'src/images/*'
            ]
        }
    }
};

gulp.task('default', [
    'build'
]);

gulp.task('build', [
    'build-script',
    'copy-script',
    'build-style',
    'copy-style',
    'build-html'
]);

gulp.task('build-script', function() {
    gulp.src(config.files.script)
        .pipe(concat('ui.js'))
        .pipe(header(config.banner + '\n(function() {\n\n"use strict";\n\n', {pkg: config.pkg}))
        .pipe(footer('\n}());\n'))
        .pipe(environments.production(uglify({mangle: false, preserveComments: 'license'})))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('copy-script', function() {
    gulp.src(config.files.vendor.js)
        .pipe(vendor('vendor.js'))
        .pipe(environments.production(uglify({preserveComments: 'license'})))
        .pipe(chmod(644))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('build-style', function() {
    gulp.src(config.files.style)
        .pipe(concat('style.css'))
        .pipe(header(config.banner + '\n', {pkg: config.pkg}))
        .pipe(myth())
        .pipe(environments.production(uglifycss()))
        .pipe(chmod(644))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('copy-style', function() {
    gulp.src(config.files.vendor.css)
        .pipe(vendor('vendor.css'))
        .pipe(environments.production(uglifycss()))
        .pipe(chmod(644))
        .pipe(gulp.dest('public/assets/css'));

    gulp.src(config.files.vendor.fonts)
        .pipe(chmod(644))
        .pipe(gulp.dest('public/assets/fonts'));

    gulp.src(config.files.vendor.images)
        .pipe(chmod(644))
        .pipe(gulp.dest('public/assets/images'));
});

gulp.task('build-html', function() {
    gulp.src(config.files.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(chmod(644))
        .pipe(gulp.dest('public/'));
});
