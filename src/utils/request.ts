import globalStore from '@modules/globalStore';
import user from '@modules/user';
import { IAnyObject, IResponseType } from '@typings';

import { checkShowDebug } from './util';
import wxapi from './wxapi';

const app = getApp();
const extConfig = app.extConfig;

const accountInfo = wx.getAccountInfoSync();

export class RequestError extends Error {
    code: number;
    data: any;

    constructor(detail: any) {
        super();
        const { code, msg, data, statusCode } = detail;
        const isNativeRequestError = statusCode !== 200;
        if (isNativeRequestError) {
            this.code = statusCode!;
            this.message = `服务请求失败（${statusCode}）`;
            return;
        }
        this.code = code;
        this.message = msg;
        this.data = data;
    }
}

const wxRequest = function (config: WechatMiniprogram.RequestOption) {
    const options = Object.assign(
        {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                authorization: app.globalData.userInfo.token || '',
                'env-version': accountInfo.miniProgram.envVersion
            },
            dataType: 'json'
        },
        config
    );

    return new Promise<IResponseType>((resolve, reject) => {
        options.success = ({ statusCode, data, profile }) => {
            if (checkShowDebug()) {
                let time = 'not supported';
                if (profile) {
                    // @ts-ignore
                    // console.log(`domainTime: ${profile.domainLookUpEnd - profile.domainLookUpStart}ms`);
                    // console.log(`connectTime: ${profile.connectEnd - profile.connectStart}ms`);
                    // console.log(`SSLconnection: ${profile.SSLconnectionEnd - profile.SSLconnectionStart}ms`);
                    // @ts-ignore
                    time = profile.responseEnd - profile.domainLookUpStart + 'ms';
                }
                globalStore.push('network', {
                    ...options,
                    response: data,
                    status: statusCode,
                    time
                });
            }

            if (statusCode === 200) {
                // @ts-ignore
                if (data.code === 200) {
                    resolve(data as IResponseType);
                    return;
                }
                // @ts-ignore
                if (data.code === 11001) {
                    wx.stopPullDownRefresh();
                    user.resetUserInfo();
                    wx.showModal({
                        title: '温馨提示',
                        content: '您的登录信息已过期，请重试',
                        showCancel: false,
                        success: () => {
                            wxapi.reLaunch('/pages/index/index');
                            return;
                        }
                    });
                }
            }

            // @ts-ignore
            reject(new RequestError({ ...data, statusCode }));
        };

        options.fail = (err) => {
            if (checkShowDebug()) {
                globalStore.push('network', {
                    ...options,
                    error: true,
                    response: err,
                    status: err.errMsg,
                    time: 'unknown'
                });
            }

            reject(new RequestError({ msg: '服务请求失败' }));
        };
        wx.request(options);
    });
};

export const apiRequest = {
    baseURL: extConfig.apiUrl,
    get(url: string, data: IAnyObject = {}, option: IAnyObject = {}) {
        return wxRequest({ url: `${this.baseURL}${url}`, data, ...option });
    },
    post(url: string, data: IAnyObject = {}, option: IAnyObject = {}) {
        return wxRequest({ url: `${this.baseURL}${url}`, data, method: 'POST', ...option });
    }
};

export const wxApiRequest = {
    baseURL: extConfig.wxApiUrl,
    get(url: string, data: IAnyObject = {}, option: IAnyObject = {}) {
        return wxRequest({ url: `${this.baseURL}${url}`, data, ...option });
    },
    post(url: string, data: IAnyObject = {}, option: IAnyObject = {}) {
        return wxRequest({ url: `${this.baseURL}${url}`, data, method: 'POST', ...option });
    }
};

export const gApiRequest = {
    baseURL: extConfig.gApiUrl,
    get(url: string, data: IAnyObject = {}, option: IAnyObject = {}) {
        return wxRequest({ url: `${this.baseURL}${url}`, data, ...option });
    },
    post(url: string, data: IAnyObject = {}, option: IAnyObject = {}) {
        return wxRequest({ url: `${this.baseURL}${url}`, data, method: 'POST', ...option });
    }
};

export const uploadImage = (filePath: string): Promise<IResponseType<{ url: string }>> => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: `${extConfig.apiUrl}/mp/upload/image`,
            filePath: filePath,
            name: 'file',
            header: {
                authorization: app.globalData.userInfo.token || '',
                'env-version': accountInfo.miniProgram.envVersion
            },
            success(res) {
                resolve(JSON.parse(res.data) as IResponseType);
            },
            fail(err) {
                reject(err);
            }
        });
    });
};
