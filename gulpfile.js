const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const tsProject = ts.createProject('tsconfig.json');

const SRC = "src/**/*.ts";
const DIST = "dist";

function server(done) {
    nodemon({
        script: 'dist/server.js'
        , ext: 'js html'
        , env: { NODE_ENV: process.env.NODE_ENV || 'development' }
        , done: done
    });
}

function clean(done) {
    del.sync("dist", "maps");
    done();
}

function copy() {
    return gulp.src(['src/**/*.yaml', 'src/**/*.key'])
        .pipe(gulp.dest(DIST));
}

function compile() {
    return gulp.src(SRC)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write('../maps', {
            mapSources: (path) => {
                let depth = path.split(/[/,\\]/).length - 3, sourcePath = '';
                if (depth >= 0) {
                    sourcePath = '../'.repeat(depth) + path;
                } else {
                    sourcePath = path;
                }
                return sourcePath;
            }
        }))
        .pipe(gulp.dest(DIST));
}

/**
 * Gulp v3.X.X Style tasks
 *
*/
// gulp.task('compile', compile);
// gulp.task('server', server);
// gulp.task('server', server);
// gulp.task('copy', copy);
// gulp.task('build', ['compile', 'copy']);
// gulp.task('heroku:', ['build'])
// gulp.task('default', ['compile', 'copy', 'server']);


/**
 * Gulp v4.X.X Style tasks
 *
*/
exports.compile = compile;
exports.server = server;
exports.clean = clean;
exports.build = gulp.series([clean, compile, copy]);
exports['heroku:'] = gulp.series([clean, compile, copy]);
exports.default = gulp.series([compile, copy, server]);
