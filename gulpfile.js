const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");

const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const gcmq = require("gulp-group-css-media-queries");
const preproc = require("gulp-stylus");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");

const del = require("del");
/* const uglify = require("gulp-uglify-es").default; */

const sftp = require("gulp-sftp");
const plumber = require("gulp-plumber"); //Перезапуск при ошибке

var config = {
  src: "./src",
  build: "./build",
  html: {
    src: "/*.html",
    dest: "/",
  },
  pug: {
    src: "/views/pages/*.pug",
    dest: "/",
  },
  fonts: {
    src: "/fonts/*",
    dest: "/fonts/",
  },
  js: {
    src: "/js/**/*.js",
    dest: "/js/",
  },
  img: {
    src: "/img/**",
    dest: "/img/",
  },
  css: {
    src: "/css/*",
    dest: "/css/",
  },
  sass: {
    watch: "/styles/**/*.scss",
    src: "/styles/**/*.scss",
    dest: "/css/",
  },
};

/* var host = {
  server: "c0066.paas1.ams.modxcloud.com",
  user: "c0066",
  passord: "xtbkwxtk",
  css: "www/css/"
};
 */
/* gulp.task("html", function () {
  gulp
    .src(config.src + config.html.src)
    .pipe(gulp.dest(config.build + config.html.dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}); */

gulp.task("pug", () => {
  return gulp
    .src(config.src + config.pug.src)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(config.build + config.pug.dest));
});

gulp.task("sass", () => {
  return gulp
    .src(config.src + config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(config.build + config.sass.dest));
  /* .pipe(
      browserSync.reload({
        stream: true,
      })
    ); */
});

gulp.task("img", function () {
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

gulp.task("js", () => {
  return gulp
    .src(config.src + config.js.src)
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build + config.js.dest));
});

/* gulp.task("js", function () {
  gulp
    .src(config.src + config.js.src)
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(uglify())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.build + config.js.dest))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}); */

gulp.task("watch", () => {
  watch(config.src + config.pug.src, gulp.series("pug"));
  watch(config.src + config.sass.src, gulp.series("sass"));
  watch(config.src + config.js.src, gulp.series("js"));
  /*  watch(config.src + config.img.src, gulp.series("img")); */
});

/* gulp.task("fonts", function() {
  gulp
    .src(config.src + config.fonts.src)
    .pipe(gulp.dest(config.build + config.fonts.dest));
});

gulp.task("img", function() {
  gulp
    .src(config.src + config.img.src)
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest(config.build + config.img.dest));
});

gulp.task("js", function() {
  gulp
    .src(config.src + config.js.src)
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(uglify())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.build + config.js.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("css", function() {
  gulp
    .src(config.src + config.css.src)
    //.pipe(sourcemaps.init())
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.build + config.css.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("del", function() {
  let path = config.build + "/*";

  if (path.substr(0, 1) === "/") {
    console.log("never delete files from root :)");
  } else {
    del.sync(path);
  }
});

gulp.task(
  "all",
  ["del", "html", "fonts", "img", "js", "css", "preproc"],
  function() {}
);

gulp.task("preproc", function() {
  gulp
    .src(config.src + config.preproc.src)
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(preproc())
    .pipe(gcmq())
    .pipe(
      autoprefixer({
        browsers: ["> 0.01%"],
        cascade: false
      })
    )
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.build + config.preproc.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("watch", ["browserSync", "preproc", "html", "js"], function() {
  gulp.watch(config.src + config.preproc.watch, ["preproc"]);
  gulp.watch(config.src + config.html.src, ["html"]);
  gulp.watch(config.src + config.js.src, ["js"]);
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: config.build
    }
  });
});

// Удаленка

gulp.task("sftp-css", function() {
  return gulp.src(config.build + config.css.src).pipe(
    sftp({
      host: host.server,
      user: host.user,
      pass: host.password,
      remotePath: host.css
    })
  );
}); */
