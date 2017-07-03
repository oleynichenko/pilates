var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence");
var del = require("del");
var pug = require("gulp-pug");

gulp.task("pug", function() {
  gulp.src("src/pug/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("src"));
});

gulp.task("style", function() {
  gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions" 
      ]})
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("src/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["run-src"], function() {
  server.init({
    server: "src",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.scss", ["style"]);
  gulp.watch("src/pug/**/*.pug", ["pug"]);
  gulp.watch("src/*.html").on("change", server.reload);
});

gulp.task("run-src", function(fn) {
  run("pug", "style", fn);
});

// сборка

gulp.task("style-build", function() {
  gulp.src("build/css/style.css")
    .pipe(postcss([
      mqpacker({
        sort: true
        })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
  gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
       imagemin.optipng({optimizationLevel: 3}),
       imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
 return gulp.src([
   "src/fonts/**/*.{woff,woff2}",
   "src/img/**",
   "src/js/**",
   "src/css/**",
   // "src/*.html", "!library-demo.html"
   "src/*.html"
   ], {
   base: "src"
   })
 .pipe(gulp.dest("build"));
});


gulp.task("clean", function() {
  return del("build");
});

gulp.task("run-build", function(fn) {
  run("clean", "copy", "style-build", "images", "generate-favicon", "inject-favicon-markups", fn);
});

// Копирование для Портфолио

gulp.task("copy-portfolio", function() {
 return gulp.src([
   "build/**/*.*"
   ])
 .pipe(gulp.dest("../oleynichenko.github.io/device"));
});

gulp.task("clean-portfolio", function() {
  return del(["../oleynichenko.github.io/device/**", "!../oleynichenko.github.io/device"], {force: true});
});

gulp.task("build-portfolio", function(fn) {
  run("clean-portfolio", "copy-portfolio", fn);
});

//favicon



