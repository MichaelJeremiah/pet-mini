import { distPath } from './sourcePath';

import execa from 'execa';
import minimist from 'minimist';
import path from 'path';

const wechatDevTools = '/Applications/wechatwebdevtools.app';
const cli = `${wechatDevTools}/Contents/MacOS/cli`;

export function launchDevTools() {
    const argv = minimist(process.argv.slice(2));
    if (argv.open) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('success');
            }, 300);
        }).then(() => {
            return execa(cli, ['open', '--project', path.resolve(distPath)], {
                stdio: 'inherit',
            });
        });
    }
    return Promise.resolve();
}
