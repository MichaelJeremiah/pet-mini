/**
 * @file 打包正式版
 */
const execa = require('execa');
const ora = require('ora');
const inquirer = require('inquirer');

const utils = require('./utils');

const { wxConfig } = utils.getWxConfig();

const isvList = {
    'wx49a127b04708655c': '微拍堂策方-测试',
    'wx5390da723a1487fc': '微拍堂策方',
    'wxbe4e25610fb29520': '成都策方'
};

const choices = Object.keys(wxConfig.extConfig).map(key => {
    const { appid, appName } = wxConfig.extConfig[key];
    const isvName = isvList[appid];
    return {
        key,
        name: `【${isvName}】${appName}`,
        value: key
    };
});

inquirer.prompt([
    {
        name: 'mini',
        type: 'list',
        message: '请选择预览小程序',
        choices
    },
    {
        name: 'tpl',
        type: 'list',
        message: '请选择首页模板',
        choices: [
            {
                key: 'ds',
                name: '电商版',
                value: 'ds'
            },
            {
                key: 'ls',
                name: '零售版',
                value: 'ls'
            }
        ]
    }
]).then((answers) => {
    const { mini, tpl } = answers;

    if (mini === 'qsx') {
        console.log();
        console.log('当前打包小程序为微拍堂武林专用，将隐藏会员模块');
        console.log();
    }

    const spinner = ora('小程序打包中...').start();
    execa.commandSync('npx gulp clean');
    execa.commandSync(`npx gulp build --mini ${mini} --tpl ${tpl}`);
    spinner.succeed('打包完成');
});
