import colors from 'colors';
import fs from 'fs';
import { readFile, writeFile } from 'jsonfile';
import _ from 'lodash';
import minimist from 'minimist';
import path from 'path';
import yaml from 'yaml';

export async function initProjectConfig() {
    if (!fs.existsSync('wx.config.yaml')) {
        console.log('wx.config.yaml 不存在');
        return;
    }

    const argv = minimist(process.argv.slice(2));
    const mini = argv.mini || 'test1';

    const projectJson = path.join(__dirname, '../dist/project.config.json');
    const wxConfig = fs.readFileSync('wx.config.yaml', 'utf8');

    async function writeProjectConfig(config: Record<string, unknown>) {
        const jsonConfig = await readFile(projectJson);
        const result = _.merge(jsonConfig, config);
        writeFile(projectJson, result, { spaces: 2 }, (err: unknown) => {
            if (err) {
                console.error(err);
            }
            console.log('project.config.json 已配置');
        });
    }

    function readWxConfig(config: string) {
        return yaml.parse(config, { prettyErrors: true });
    }

    if (wxConfig) {
        const originConfig = readWxConfig(wxConfig);
        let appid = '';
        if (originConfig.baseConfig.extEnable) {
            appid = originConfig.extConfig[mini].appid;
        } else {
            appid = originConfig.appid;
        }
        if (!appid) {
            console.log(colors.red('wx.config.yaml 不存在 appid 配置'));
            return;
        }
        const finallyConfig = {
            appid,
            projectname: originConfig?.projectname
        };
        await writeProjectConfig(finallyConfig);
    }
}
