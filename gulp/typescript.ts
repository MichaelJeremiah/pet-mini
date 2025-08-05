import { aliasConfig, distPath, sourcemapsPath, tsFiles } from './sourcePath';

import colors from 'colors';
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import gulpTypescript from 'gulp-typescript';
import aliases from 'gulp-wechat-weapp-src-alisa';

const tsProject = gulpTypescript.createProject('src/tsconfig.json');

export const tsParser = () => {
    return gulp.src(tsFiles, { since: gulp.lastRun(tsParser) })
        .pipe(plumber((err) => console.log(colors.red(err.message))))
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        // .pipe(eslint.failAfterError())
        .pipe(tsProject()).js
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(aliases(aliasConfig))
        .pipe(sourcemaps.write(sourcemapsPath))
        .on('error', function (err: string) { 
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(distPath));
};
