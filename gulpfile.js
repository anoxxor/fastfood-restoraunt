const { parallel, watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
const sass_compiler = require('node-sass');
const sassGlob = require('gulp-sass-glob');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleancss = require('gulp-clean-css');
const autopref = require('gulp-autoprefixer');
const bsync = require('browser-sync').create();

const SASS_WATCH = "src/scss/**/*.scss";
const SASS_COMPILE = "src/scss/main.scss";
const JS_WATCH = "src/js/**/*.js";
const JS_COMPILE = JS_WATCH;
const HTML_WATCH = "index.html";

sass.compiler = sass_compiler;

function bsyncInit() {
    bsync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
}

function bundleStyles() {
    return src(SASS_COMPILE)
        .pipe(sassGlob())
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("bundle.css"))
        .pipe(autopref())
        .pipe(dest("./"))
        .pipe(bsync.stream());
}

function bundleJs() {
    return src(JS_COMPILE)
        .pipe(concat("bundle.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest("./"))
        .pipe(bsync.stream());
}

function watchAll() {
    bsyncInit();

    options = {
        ignoreInitial: false
    }
    watch(SASS_WATCH, options, bundleStyles);
    watch(JS_WATCH, options, bundleJs);
    watch(HTML_WATCH, options, (done) => {bsync.reload(); done()});
}


exports.default = watchAll;
exports.prod = parallel(
    function() {
        return src(SASS_COMPILE)
            .pipe(sassGlob())
            .pipe(sass().on("error", sass.logError))
            .pipe(cleancss())
            .pipe(concat("bundle.min.css"))
            .pipe(autopref())
            .pipe(dest("./"));
    },
    function() {
        return src(JS_COMPILE)
            .pipe(concat("bundle.js"))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(dest("./"));
    });
