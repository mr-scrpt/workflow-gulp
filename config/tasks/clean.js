const gulp = require("gulp");
const { config } = require("../config");
const clean = require("gulp-clean");

exports.clean = gulp.task("clean", () => {
  return gulp
    .src(config.build, { read: false, allowEmpty: true })
    .pipe(clean({ allowEmpty: true }));
});
