const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

gulp.task("sass", function() {
	return gulp
		.src("sass/**/*.scss")
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions"],
				cascade: false
			})
		)
		.pipe(
			sass({ outputStyle: "compressed", includePaths: ["node_modules"] }).on(
				"error",
				sass.logError
			)
		) // Using gulp-sass
		.pipe(gulp.dest("public/css"))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

gulp.task("watch", ["browserSync", "sass"], function() {
	gulp.watch("sass/**/*.scss", ["sass"]);
});

gulp.task("serve", function() {
	browserSync.init({
		server: {
			baseDir: "public"
		}
	});
	gulp.watch("sass/**/*.scss", ["sass"]);
});

gulp.task("images", function() {
	return gulp
		.src("images/**/*.+(png|jpg|gif|svg)")
		.pipe(imagemin(imagemin.optipng({ optimizationLevel: 5 })))
		.pipe(gulp.dest("public/images"));
});

gulp.task("build", [`sass`, `images`], function() {
	console.log("Building files");
});
