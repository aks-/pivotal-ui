require('babel-polyfill');
require('babel-register')({});
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var requireDir = require('require-dir');
requireDir('./tasks');

var gulp = require('gulp');

gulp.task('default', ['dev']);
