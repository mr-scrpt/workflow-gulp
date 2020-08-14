const gulp = require("gulp");
const { config } = require("./config/config");
const {
  sass,
  pug,
  clean,
  img,
  imgProd,
  js,
  fonts,
  reloader,
} = require("./config/tasks");

const watch = require("gulp-watch");

gulp.task(
  "watch",
  gulp.parallel(
    gulp.series("clean", "img", "sass", "pug", "js", "fonts", "reloader"),
    () => {
      watch(config.src + config.pug.watch, gulp.series("pug"));
      watch(config.src + config.sass.watch, gulp.series("sass"));
      watch(config.src + config.js.src, gulp.series("js"));
    }
  )
);

gulp.task(
  "build",
  gulp.series("clean", "sass", "pug", "js", "fonts", "img") //"imgProd"
);
