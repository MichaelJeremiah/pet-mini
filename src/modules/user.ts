import { apiRequest, gApiRequest } from '@utils/request';

const app = getApp();

class User {
    constructor() {}

    /**
     * 登录
     */
    login() {
        const globalUserInfo = app.globalData.userInfo;
        if (globalUserInfo.token && +new Date() < globalUserInfo.expireTime) {
            return Promise.resolve(globalUserInfo);
        }

        return new Promise((resolve, reject) => {
            wx.login({
                success: ({ code }) => {
                    apiRequest
                        .post('/mp/auth', { code })
                        .then(({ data }) => {
                            this.setGlobalUserInfo({
                                token: data.token,
                                openid: data.openid,
                                expireTime: (Date.now() + 24 * 3600) * 1000 // token设置24小时有效
                            });
                            resolve({
                                token: data.token,
                                openid: data.openid
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                },
                fail: (err) => {
                    console.log(err);
                    reject(err);
                }
            });
        });
    }

    /**
     * 设置全局用户信息
     */
    setGlobalUserInfo(userInfo = {}) {
        const newUserInfo = Object.assign({}, app.globalData.userInfo, userInfo);
        app.globalData.userInfo = newUserInfo;
        wx.setStorageSync('globalData', app.globalData);
    }

    /**
     * 刷新本地缓存用户数据
     */
    refreshUserInfo() {
        return apiRequest.get('/tools/member/customer/get-user-info-c').then(({ data }) => {
            const {
                isVip,
                sy_status,
                plusStatus,
                plusExpireTime,
                memberCardsNum,
                totalScore,
                balance,
                brand,
                groupQrcodeUrl,
                isCompanyOpenMemberPlus,
                isOpenCustomTransaction
            } = data;
            this.setGlobalUserInfo({
                isVip,
                plusVipStatus: plusStatus,
                plusVipExpireTime: plusExpireTime,
                companyIsOpenMemberPlus: isCompanyOpenMemberPlus,
                cardsNum: memberCardsNum,
                score: totalScore,
                syStatus: sy_status,
                balance,
                serviceQrcodeUrl: brand.qrImage || '',
                groupChatUrl: groupQrcodeUrl.url || '',
                isOpenCustomTransaction
            });
            return app.globalData.userInfo;
        });
    }

    /**
     * 完善用户信息
     */
    updateUserInfo(userProfile: WechatMiniprogram.GetUserProfileSuccessCallbackResult) {
        const { encryptedData, iv, signature, userInfo } = userProfile;
        const params = {
            nickname: userInfo.nickName,
            headimgurl: userInfo.avatarUrl,
            sex: userInfo.gender,
            country: userInfo.country,
            province: userInfo.province,
            city: userInfo.city,
            region: '',
            lang: userInfo.language
        };
        return gApiRequest.post('/mini/auth/improve-info', params).then(() => {
            this.setGlobalUserInfo({
                ...userInfo,
                encryptedData,
                iv,
                signature,
                needUserInfo: false
            });
        });
    }

    /**
     * 充值用户信息
     */
    resetUserInfo() {
        app.globalData.userInfo = {};
        wx.setStorageSync('globalData', app.globalData);
    }
}

export default new User();
