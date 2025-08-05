import colors from 'colors';
import fs from 'fs';
import { writeFile } from 'jsonfile';
import _ from 'lodash';
import minimist from 'minimist';
import path from 'path';
import yaml from 'yaml';

export async function initExtConfig() {
    if (!fs.existsSync('wx.config.yaml')) {
        console.log(colors.red('wx.config.yaml 不存在'));
        return;
    }

    const argv = minimist(process.argv.slice(2));
    const mini = argv.mini || 'test1';
    const env = argv.env || 'test';

    const projectJson = path.join(__dirname, '../src/ext.json');
    const extConfig = path.join(__dirname, '../src/ext.js');
    const wxConfig = fs.readFileSync('wx.config.yaml', 'utf8');

    async function writeProjectConfig(config: Record<string, unknown>) {
        writeFile(projectJson, config, { spaces: 2 }, (err: unknown) => {
            if (err) {
                console.error(err);
            }
            console.log(config);
            console.log(colors.green('ext.json 已配置'));
        });
    }

    async function writeExtConfig(config: Record<string, unknown>) {
        fs.writeFile(extConfig, `const extConfig = JSON.parse('${JSON.stringify(config)}');\nexport default extConfig;`, (err: unknown) => {
            if (err) {
                console.error(err);
            }
            console.log(config);
            console.log(colors.green('ext.js 已配置'));
        });
    }

    function readWxConfig(config: string) {
        return yaml.parse(config, { prettyErrors: true });
    }

    if (wxConfig) {
        const originConfig = readWxConfig(wxConfig);
        if (!originConfig.baseConfig.extEnable) {
            console.log(colors.yellow('未开启ext.json配置，将使用ext.js配置'));
            writeExtConfig(originConfig.extConfig[env]);
            return;
        }
        const { appid, extAppid, ...ext } = originConfig.extConfig[mini];
        const finallyConfig = {
            ...originConfig.baseConfig,
            extAppid,
            ext
        };
        await writeProjectConfig(finallyConfig);
    }
}
