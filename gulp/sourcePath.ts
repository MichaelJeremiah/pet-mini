import minimist from 'minimist';
import path from 'path';

const argv = minimist(process.argv.slice(2));
const tpl = argv.tpl || 'ds';

export const appPath = 'src/**';
export const whitelist: string[] = [
    `!${appPath}/_template/**/*`, 
    `!${appPath}/wxs/**/*`, 
    `!${appPath}/services/**/*`, 
    `!${appPath}/tsconfig`, 
    `!${appPath}/*.{ds,ls}`,
];
export const distPath = 'dist';

export const jsFiles = [`${appPath}/*.js`];
export const wxsFiles = [`${appPath}/*.wxs`];
export const wxssFiles = [`${appPath}/*.wxss`, ...whitelist.map(s => `${s}.wxss`)];
export const wxmlFiles = [`${appPath}/*.wxml`, ...whitelist.map(s => `${s}.wxml`)];
export const lessFiles = [`${appPath}/*.less`, 'src/*.less', ...whitelist.map(s => `${s}.less`)];
export const jsonFiles = [`${appPath}/*.json`, ...whitelist.map(s => `${s}.json`)];
export const tsFiles = [`${appPath}/*.ts`, ...whitelist.map(s => `${s}.ts`), `!${appPath}/*.d.ts`];
export const imgFiles = [`${appPath}/images/**/*.{png,jpg,gif,ico}`];
export const tplFiles = [`${appPath}/*.${tpl}.{less,wxss,wxml,ts,json}`];

export const basePath = path.join(__dirname, '../src/base');
export const behaviorsPath = path.join(__dirname, '../src/behaviors');
export const componentsPath = path.join(__dirname, '../src/components');
export const modulesPath = path.join(__dirname, '../src/modules');
export const pagePath = path.join(__dirname, '../src/pages');
export const utilPath = path.join(__dirname, '../src/utils');
export const typingPath = path.join(__dirname, '../src/typings');
export const constantsPath = path.join(__dirname, '../src/constants');
export const sourcemapsPath = '../sourcemaps';
export const npmPath = path.join(__dirname, '../src/npm');
export const projectConfig = ['project.config.json'];

/**
 * 引用路径别名配置
 */
export const aliasConfig = {
    '@base': basePath,
    '@behaviors': behaviorsPath,
    '@components': componentsPath,
    '@modules': modulesPath,
    '@utils': utilPath,
    '@typings': typingPath,
    '@constants': constantsPath,
};
