const paths = {
  src: "./src",
  build: "./build",
  html: {
    src: "/*.html",
    dest: "/",
  },
  pug: {
    src: "/views/pages/*.pug",
    dest: "/",
    watch: "/views/**/*.pug",
  },
  fonts: {
    src: "/fonts/*",
    dest: "/fonts/",
    watch: "/fonts/**/*.*",
  },
  js: {
    src: "/js/**/*.js",
    dest: "/js/",
    watch: "/js/**/*.js",
  },
  img: {
    src: "/img/**",
    dest: "/img/",
    watch: "/img/**/*.*",
  },
  css: {
    src: "/css/*",
    dest: "/css/",
  },
  sass: {
    watch: "/styles/**/*.scss",
    src: "/styles/**/style.scss",
    dest: "/css/",
  },
};

exports.config = {
  ...paths,
};
