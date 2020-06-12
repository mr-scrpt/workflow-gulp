const gulp = require("gulp");
const { config } = require("../config");
const imagemin = require("gulp-imagemin");
exports.img = gulp.task("img", function () {
  return (
    gulp
      .src(config.src + config.img.src)
      /* .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    ) */
      .pipe(gulp.dest(config.build + config.img.dest))
  );
});

exports.imgProd = gulp.task("imgProd", function () {
  return gulp
    .src(config.src + config.img.src)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(config.build + config.img.dest));
});
