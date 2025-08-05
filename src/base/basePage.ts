import system from '@modules/system';
import user from '@modules/user';
import { parseScene } from '@utils/util';

type IOptions = WechatMiniprogram.Page.DataOption & WechatMiniprogram.Page.ILifetime;

function basePage(option: Partial<IOptions>) {
    const { onLoad, onShow, onReady, onHide, onUnload, onShareAppMessage } = option;

    option.data.isIPhoneX = system.info.isIPhoneX;

    option.onLoad = function (query: Record<string, string | undefined>) {
        console.log('[basePage] onLoad', {
            ...query,
            ...(query.scene ? parseScene(query.scene) : {})
        });
        onLoad &&
            onLoad.call(this, {
                ...query,
                ...(query.scene ? parseScene(query.scene) : {})
            });
        // user.login().then(() => {
        //     onLoad && onLoad.call(this, {
        //         ...query,
        //         ...(query.scene ? parseScene(query.scene) : {})
        //     });
        // });
    };

    option.onShow = function () {
        onShow && onShow.call(this);
    };

    option.onReady = function () {
        onReady && onReady.call(this);
    };

    option.onHide = function () {
        onHide && onHide.call(this);
    };

    option.onUnload = function () {
        onUnload && onUnload.call(this);
    };

    if (onShareAppMessage) {
        option.onShareAppMessage = function (shareOption: WechatMiniprogram.Page.IShareAppMessageOption) {
            return onShareAppMessage.call(this, shareOption);
        };
    }

    return Page(option);
}

export default basePage;
