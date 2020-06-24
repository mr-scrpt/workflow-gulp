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
      watch(config.src + config.js.watch, gulp.series("js"));
      watch(config.src + config.img.watch, gulp.series("img"));
    }
  )
);

gulp.task(
  "build",
  gulp.series("clean", "sass", "pug", "js", "fonts", "imgProd")
);
