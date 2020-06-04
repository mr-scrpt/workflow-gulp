const gulp = require("gulp");
const { config } = require("../config");
const { browserSync } = require("../tasks/browserSync");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");

exports.js = gulp.task("js", () => {
  return gulp
    .src(config.src + config.js.src)
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build + config.js.dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});
