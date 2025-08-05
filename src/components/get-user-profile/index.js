import baseComponent from '@base/baseComponent';
import user from '@modules/user';

const app = getApp();

baseComponent({
    properties: {},
    methods: {
        handleUserProfile(e) {
            const { userInfo } = app.globalData;
            if (userInfo.needUserInfo) {
                wx.getUserProfile({
                    lang: 'zh_CN',
                    desc: '用于完善会员资料',
                    success: (res) => {
                        user.updateUserInfo(res);
                        this.triggerEvent('click', e);
                    },
                    fail: () => {
                        console.log('用户拒绝授权用户信息');
                    }
                });
            } else {
                this.triggerEvent('click', e);
            }
        }
    }
});