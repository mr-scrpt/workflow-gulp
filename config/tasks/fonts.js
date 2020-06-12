const gulp = require("gulp");
const { config } = require("../config");

exports.fonts = gulp.task("fonts", function () {
  return gulp
    .src(config.src + config.fonts.src)
    .pipe(gulp.dest(config.build + config.fonts.dest));
});
