const paths = {
  src: "./src",
  build: "./build",
  html: {
    src: "/*.html",
    dest: "/",
  },
  pug: {
    watch: "/views/**/*.pug",
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
    src: "/styles/**/style.scss",
    dest: "/css/",
  },
};

exports.config = {
  ...paths,
};
