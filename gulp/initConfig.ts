import colors from 'colors';
import fs from 'fs';
import _ from 'lodash';
import minimist from 'minimist';
import path from 'path';

export async function initConfig() {
    const argv = minimist(process.argv.slice(2));
    console.log(argv);

    const configPath = path.join(__dirname, '../src/constants/config.js');

    async function writeConfig(config: Record<string, unknown>) {
        fs.writeFile(configPath, `const config = JSON.parse('${JSON.stringify(config)}');\nexport default config;`, (err: unknown) => {
            if (err) {
                console.error(err);
            }
            console.log(config);
            console.log(colors.green('config.js 已配置'));
        });
    }

    writeConfig(argv);
}
