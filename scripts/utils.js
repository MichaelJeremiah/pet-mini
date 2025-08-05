const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

function getWxConfig() {
    const yamlPath = path.join(__dirname, '../wx.config.yaml');

    if (!fs.existsSync(yamlPath)) {
        throw Error('wx.config.yaml 不存在');
    }

    const wxConfigStr = fs.readFileSync(yamlPath, 'utf8');
    const wxConfig = yaml.parse(wxConfigStr, { prettyErrors: true });

    return {
        wxConfigStr,
        wxConfig
    };
}

module.exports = {
    getWxConfig
};
