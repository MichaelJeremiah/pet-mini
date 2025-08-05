import baseComponent from '@base/baseComponent';
import system from '@modules/system';
import { checkShowDebug, generateUrl } from '@utils/util';
import wxapi from '@utils/wxapi';

const app = getApp();

baseComponent({
    data: {
        showDebug: false,
        nodePosition: {
            left: 10,
            top: 450
        },
        visible: false,
        visibleLog: false,
        visibleSystemInfo: false,
        currentPath: '',
        enableDebug: false,
        extConfig: {
            env: 'development',
            appName: '',
            appVersion: ''
        },
        accountInfo: {
            envVersion: 'release'
        }
    },
    ready() {
        this.init();
    },
    methods: {
        init() {
            const pages = getCurrentPages();
            const { route, options } = pages[pages.length - 1];
            const accountInfo = wx.getAccountInfoSync();
            const query = {};
            Object.keys(options).forEach((key) => {
                query[key] = decodeURIComponent(options[key]);
            });

            this.setData({
                showDebug: checkShowDebug(),
                currentPath: generateUrl(route, query),
                accountInfo: accountInfo.miniProgram,
                extConfig: app.extConfig,
                enableDebug: system.info.enableDebug
            });
        },
        handleShowLog() {
            this.setData({
                visibleLog: true,
                visible: false,
                visibleSystemInfo: false
            });
        },
        /**
         * 显示设置
         */
        handleShowDebugTool() {
            this.setData({
                visible: true,
                visibleLog: false,
                visibleSystemInfo: false
            });
        },
        /**
         * 隐藏设置
         */
        handleHideDebugTool() {
            this.setData({
                visible: false
            });
        },
        /**
         * 设置移动
         * @param {*} e
         */
        handleTouchMove(event) {
            const { clientX, clientY } = event.touches[0];
            const { windowWidth, windowHeight } = system.info;
            this.setData({
                nodePosition: {
                    left: Math.max(0, Math.min(clientX, windowWidth - 50)),
                    top: Math.max(0, Math.min(clientY, windowHeight - 50))
                }
            });
        },

        /**
         * 输入路径
         * @param {*} e
         */
        onInputUrl(event) {
            let { value } = event.detail;
            this.openUrl = value;
        },
        /**
         * 复制当前路径
         */
        handleCopyCurrentPath() {
            wx.setClipboardData({
                data: this.data.currentPath
            });
        },
        /**
         * 刷新页面
         */
        handleReloadPage() {
            wx.nextTick(() => {
                wx.reLaunch({ url: `/${this.data.currentPath}` });
            });
        },
        /**
         * 清除所有缓存
         */
        handleClearStorage() {
            wx.clearStorageSync();
            this.handleReloadPage();
        },
        handleSystemInfo() {
            this.setData({
                visibleSystemInfo: true,
                visible: false,
                visibleLog: false
            });
        },
        /**
         * 打开调试模式
         */
        handleEnableDebug() {
            wx.setEnableDebug({
                enableDebug: !this.data.enableDebugq
            });
        },
        /**
         * 打开地址
         */
        handleOpenUrl() {
            if (this.openUrl) {
                wxapi.gotoWebview(this.openUrl);
            }
        },
        /**
         * 复制配置信息
         */
        handleCopyExtConfig() {
            wx.setClipboardData({
                data: JSON.stringify(this.data.extConfig)
            });
        }
    }
});
