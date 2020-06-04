const gulp = require("gulp");
const { config } = require("../config");
const { browserSync } = require("../tasks/browserSync");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const gcmq = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

exports.sass = gulp.task("sass", () => {
  return gulp
    .src(config.src + config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(gcmq())
    .pipe(
      autoprefixer({
        browsers: ["> 0.01%"],
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(config.build + config.sass.dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});
