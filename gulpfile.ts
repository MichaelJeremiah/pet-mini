
import { cleanDistDir as clean } from './gulp/clean';
import {
    imagesCopy,
    jsCopy,
    jsonCopy,
    projectConfigCopy,
    wxmlCopy,
    wxsCopy,
    wxssCopy
} from './gulp/copy';
import { launchDevTools } from './gulp/devtool';
import { initExtConfig } from './gulp/initExtConfig';
import { initProjectConfig } from './gulp/initProjectConfig';
import { lessParser } from './gulp/less';
import { install } from './gulp/npm';
import {
    imgFiles,
    jsFiles,
    jsonFiles,
    lessFiles,
    projectConfig,
    tsFiles,
    wxmlFiles,
    wxsFiles,
    wxssFiles } from './gulp/sourcePath';
import { tsParser } from './gulp/typescript';

import gulp from 'gulp';

// watch
function watch() {
    gulp.watch(imgFiles, { alwaysStat: true }, imagesCopy);
    gulp.watch(wxssFiles, { alwaysStat: true }, wxssCopy);
    gulp.watch(jsFiles, { alwaysStat: true }, jsCopy);
    gulp.watch(wxsFiles, { alwaysStat: true }, wxsCopy);
    gulp.watch(jsonFiles, { alwaysStat: true }, jsonCopy);
    gulp.watch(wxmlFiles, { alwaysStat: true }, wxmlCopy);
    gulp.watch(tsFiles, { alwaysStat: true }, tsParser);
    gulp.watch(lessFiles, { alwaysStat: true }, lessParser);
    gulp.watch(projectConfig, { alwaysStat: true }, projectConfigCopy);
}

const build = gulp.series(
    // 'clean',
    initExtConfig,
    gulp.parallel(
        projectConfigCopy,
        jsCopy,
        wxssCopy,
        wxmlCopy,
        wxsCopy,
        jsonCopy,
        imagesCopy,
        tsParser,
        lessParser
    ),
    initProjectConfig,
);

const start = gulp.series(build, launchDevTools, watch);

export {
    install,
    start,
    build,
    clean
};

