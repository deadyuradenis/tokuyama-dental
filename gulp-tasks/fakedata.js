"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import debug from "gulp-debug";

gulp.task("fakedata", () => {
    return gulp.src(paths.fakedata.src)
        .pipe(gulp.dest(paths.fakedata.dist))
        .pipe(debug({
            "title": "Fakedata"
        }));
});