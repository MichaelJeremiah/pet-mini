import { distPath, lessFiles } from './sourcePath';

import colors from 'colors';
import gulp from 'gulp';
import gulpLess from 'gulp-less';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import gulpStylelint from 'gulp-stylelint';
import path from 'path';

export const lessParser = () => {
    return gulp.src(lessFiles)
        .pipe(plumber((err) => console.log(colors.red(err.message))))
        .pipe(gulpStylelint({
            fix: true,
            failAfterError: true,
            reporters: [
                { formatter: 'verbose', console: true }
            ]
        }))
        .pipe(gulpLess({
            paths: [path.join(__dirname, '../src/styles')]
        }))
        .pipe(rename({
            extname: '.wxss'
        }))
        .pipe(gulp.dest(distPath));
};
