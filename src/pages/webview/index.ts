/**
 * @file webview
 */
import basePage from '@base/basePage';

basePage({
    data: {
        path: '',
        canIUse: wx.canIUse('web-view'),
        url: '',
    },
    onLoad(query: any) {
        const url = decodeURIComponent(query.url);
        this.setData({ url });
    },
    webMessage(e: WechatMiniprogram.WebviewMessage) {
        const { data } = e.detail;
        console.log('[webview] onMessage:', data);
    }
});
