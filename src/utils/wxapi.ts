import { TabBarList } from '@constants/index';
import { IAnyObject } from '@typings';

import { generateUrl } from './util';

function routePromisify(method: 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch') {
    return (url: string, params: IAnyObject = {}) => {
        return new Promise((resolve, reject) => {
            // 页面栈最多十层
            if (getCurrentPages().length >= 9) {
                method = 'redirectTo';
            }
            // tabBar页面只允许使用reLaunch跳转
            if (TabBarList.includes(url) && method !== 'reLaunch') {
                method = 'reLaunch';
            }
            // @ts-ignore
            wx[method]({
                url: method === 'switchTab' ? url : generateUrl(url, params),
                success: resolve,
                fail: reject
            });
        });
    };
}

const navigateTo = routePromisify('navigateTo');
const redirectTo = routePromisify('redirectTo');
const switchTab = routePromisify('switchTab');
const reLaunch = routePromisify('reLaunch');

const navigateBack = (delta = 1, url?: string, params: IAnyObject = {}) => {
    return new Promise((resolve, reject) => {
        wx.navigateBack({
            delta,
            success: resolve,
            fail: () => {
                if (!url) return;
                redirectTo(url, params).then(resolve, reject);
            }
        });
    });
};

const gotoWebview = (url: string, query: Record<string, string> = {}) => {
    if (!url) {
        console.warn('请传入网页URL');
    }
    const _url = generateUrl(url, query);
    return navigateTo('/pages/webview/index', { url: _url });
};

const showToast = (options: WechatMiniprogram.ShowToastOption) => {
    options.mask = true;
    options.fail = () => {};
    wx.showToast(options);
};

const showLoading = (options: WechatMiniprogram.ShowLoadingOption) => {
    options.mask = true;
    options.fail = () => {};
    wx.showLoading(options);
};

const hideLoading = (options: WechatMiniprogram.HideLoadingOption = {}) => {
    options.fail = () => {};
    wx.hideLoading(options);
};
const getLocation = (type?: string) => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: type || 'wgs84',
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(new Error(err.errMsg));
            }
        });
    });
};

const saveImageToPhotosAlbum = (url: string) => {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url: url,
            success(res) {
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: (res) => {
                            resolve(res);
                            showToast({ icon: 'none', title: '保存成功' });
                        },
                        fail: () => {
                            showToast({ icon: 'none', title: '保存已取消' });
                            reject(new Error('保存失败'));
                        }
                    });
                } else {
                    showToast({ icon: 'none', title: '保存失败' });
                    reject(new Error('保存失败'));
                }
            }
        });
    });
};

export default {
    navigateTo,
    redirectTo,
    switchTab,
    reLaunch,
    navigateBack,
    gotoWebview,
    showToast,
    showLoading,
    hideLoading,
    getLocation,
    saveImageToPhotosAlbum
};
