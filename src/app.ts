import type { IAppOption } from '@typings';
import wxapi from '@utils/wxapi';

import '@utils/console';

// @ts-ignore
import system from './modules/system';
import extConfig from './ext';

// app.ts
App<IAppOption>({
    globalData: {
        userInfo: {}
    },
    extConfig,
    onLaunch(options) {
        console.log('[App] onLaunch', options);
        system.launchInfo(options);
        this.init();
    },
    init() {
        // 初始化全局数据
        const globalData = wx.getStorageSync('globalData');
        if (globalData && globalData.userInfo) {
            this.globalData = globalData;
        }

        this.initUpdateManager();

        console.log('[App] globalData', this.globalData);
    },
    onShow(options) {
        console.log('[App] onShow', options);
    },
    onHide() {
        console.log('[App] onHide');
    },
    onUnhandledRejection(err) {
        console.log('[App] onUnhandledRejection', err);
        // @ts-ignore
        if (typeof err.reason === 'object' && err.reason.message) {
            // @ts-ignore
            wxapi.showToast({ title: err.reason.message, icon: 'none' });
        }
        setTimeout(wxapi.hideLoading, 3000);
    },
    onError(err) {
        console.log('[App] onError', err);
    },
    /**
     * 小程序更新提示
     */
    initUpdateManager() {
        const updateManager = wx.getUpdateManager();

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                    if (res.confirm) {
                        updateManager.applyUpdate();
                    }
                }
            });
        });
    }
});
