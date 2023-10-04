"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import svg from "gulp-svg-sprite";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";

gulp.task("sprites", () => {
return gulp.src(paths.sprites.src)
.pipe(svg({
shape: {
dest: "intermediate-svg"
},
 mode: {
stack: {
sprite: "../sprite.svg"
}
}
}))
.pipe(gulp.dest(paths.sprites.dist))
.pipe(debug({
"title": "Sprites"
}))
.on("end", browsersync.reload);
});



gulp.task("sprites", () => {
    return gulp.src(paths.sprites.src)
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svg({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(paths.sprites.dist))
        .pipe(debug({
            "title": "Sprites"
        }))
        .on("end", browsersync.reload);
});

gulp.task("sprites", () => {
	return gulp.src(paths.sprites.src)
		.pipe(svg({
			shape: {
				dest: "intermediate-svg",
				id: {
					generator: function(name, file) {
						return file.stem + "-usage";
					}
				}
			},
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					inline: true
				}
			}
		}))
		.pipe(gulp.dest(paths.sprites.dist))
		.on("end", browsersync.reload);
});
