const gulp = require("gulp");
const { config } = require("../config");
const { browserSync } = require("../tasks/browserSync");
const pug = require("gulp-pug");

exports.pug = gulp.task("pug", () => {
  return gulp
    .src(config.src + config.pug.src)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(config.build + config.pug.dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});
