import { aliasConfig, distPath, imgFiles, jsFiles, jsonFiles, projectConfig, sourcemapsPath, tplFiles, wxmlFiles, wxsFiles, wxssFiles } from './sourcePath';

import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import gulpSourcemaps from 'gulp-sourcemaps';
import aliases from 'gulp-wechat-weapp-src-alisa';
// import imagemin from 'gulp-imagemin'

export const imagesCopy = () => {
    return gulp.src(imgFiles, { since: gulp.lastRun(imagesCopy) })
    // .pipe(imagemin())
        .pipe(gulp.dest(distPath));
};

export const jsCopy = () => {
    return gulp.src(jsFiles, { since: gulp.lastRun(jsCopy) })
        .pipe(gulpSourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(aliases(aliasConfig))
        .pipe(gulpSourcemaps.write(sourcemapsPath))
        .pipe(gulp.dest(distPath));
};

export const wxsCopy = () => {
    return gulp.src(wxsFiles, { since: gulp.lastRun(wxsCopy) })
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(rename({
            extname: '.wxs'
        }))
        .pipe(gulp.dest(distPath));
};

export const wxssCopy = () => {
    return gulp.src(wxssFiles, { since: gulp.lastRun(wxssCopy) })
        .pipe(gulp.dest(distPath));
};

export const wxmlCopy = () => {
    return gulp.src(wxmlFiles, { since: gulp.lastRun(wxmlCopy) })
        .pipe(gulp.dest(distPath));
};

export const jsonCopy = () => {
    return gulp.src(jsonFiles, { since: gulp.lastRun(jsonCopy) })
        .pipe(gulp.dest(distPath));
};

export const projectConfigCopy = () => {
    return gulp.src(projectConfig, { since: gulp.lastRun(projectConfigCopy) })
        .pipe(gulp.dest(distPath));
};

export const tplCopy = () => {
    return gulp.src(tplFiles)
        .pipe(rename((file) => {
            const basename = file.basename.split('.');
            basename.pop();
            return {
                dirname: file.dirname,
                basename: basename.join('.'),
                extname: file.extname
            };
        }))
        .pipe(gulp.dest((file) => file.base));
};
