const gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  // babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  rollup = require('gulp-better-rollup'),
  babel = require('rollup-plugin-babel'),
  path = require('path');

const config = {
  bundleName: 'mybundle',
  src:        './src',
  dest:       './dist',
};

gulp.task('js', () =>
  gulp.src(`${config.src}/js/tutorial.js`)
    .pipe(plumber())
    .pipe(jshint({
      'esversion': 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(rollup({
      // notice there is no `input` option as rollup integrates into gulp pipeline
      plugins: [babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: ['es2015-rollup']
      })]
    }, {
      // also rollups `sourcemap` option is replaced by gulp-sourcemaps plugin
      format: 'es',
    }))
    .pipe(concat(`${config.bundleName}.js`))
    .pipe(gulp.dest(`${config.dest}/js`))
    .pipe(rename(`${config.bundleName}.min.js`))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${config.dest}/js`))
    .on('error', (err) => {
      console.error('Error in javascript task', err.toString());
    })
    .pipe(connect.reload())
);

gulp.task('connect', function () {
  connect.server({
    root:       config.dest,
    livereload: true,
    port:       8888,
  });
});

gulp.task('html', function () {
  gulp.src(`${config.src}/*.html`)
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch([`${config.src}/*.html`], ['html']);
  gulp.watch([`${config.src}/js/**/*.js`], ['js']);
});

gulp.task('serve', ['html', 'js', 'connect', 'watch']);
gulp.task('default', ['js']);