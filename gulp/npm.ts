import { npmPath } from './sourcePath';

import del from 'del';
import execa from 'execa';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';

export const install = gulp.series(
    function removeDeps() {
        return del([`${npmPath}/*`]);
    },
    function dependency(callBack) {
        const packageJson = require(path.join(__dirname, '../package.json'));
        const { dependencies, name, version } = packageJson || {};
        fs.writeFileSync(path.resolve(npmPath, 'package.json'), JSON.stringify({ dependencies, name, version }));
        callBack();
    },
    function npmInstall() {
        return execa('npm', ['install', '--ignore-scripts', '--registry=https://registry.npmmirror.com/'], {
            stdio: 'inherit',
            cwd: npmPath,
        });
    },
    function copyListHelper() {
        return gulp.src(path.resolve(npmPath, 'node_modules/list-helper-core/miniprogram_dist/**'))
            .pipe(gulp.dest(path.resolve(npmPath, '..', 'modules', 'list-helper-core')));
    },
    function removeDeps() {
        return del(['node_modules*', 'package*.json'], {
            cwd: npmPath,
        });
    }
);
