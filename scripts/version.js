/**
 * @file 更新版本号
 */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const utils = require('./utils');

const yamlPath = path.join(__dirname, '../wx.config.yaml');
const { wxConfigStr, wxConfig } = utils.getWxConfig();
const currentVersion = wxConfig.extConfig.test1.appVersion;

const choices = (() => {
    const v = currentVersion.split('.').map(Number);

    const patchVersion = `${v[0]}.${v[1]}.${v[2]+1}`;
    const minorVersion = `${v[0]}.${v[1]+1}.0`;
    const majorVersion = `${v[0]+1}.0.0`;

    return [
        {
            key: 'patch',
            name: `修订补丁（${patchVersion}）`,
            value: patchVersion
        },
        {
            key: 'minor',
            name: `特性更新（${minorVersion}）`,
            value: minorVersion
        },
        {
            key: 'major',
            name: `版本升级（${majorVersion}）`,
            value: majorVersion
        },
    ];
})();

inquirer.prompt([
    {
        name: 'version',
        type: 'list',
        message: '请选择更新类型',
        choices
    }
]).then((answers) => {
    const reg = new RegExp(currentVersion, 'g');

    fs.writeFile(yamlPath, wxConfigStr.replace(reg, answers.version), (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`版本已更新（${answers.version}）`);
    });
});




