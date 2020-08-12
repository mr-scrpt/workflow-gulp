const gulp = require("gulp");
const { config } = require("../config");
const { browserSync } = require("../tasks/browserSync");

exports.reloader = gulp.task("reloader", () => {
  browserSync.init({
    open: false,
    server: {
      baseDir: config.build,
    },
    notify: false,
  });
});
