/**
 * System 获取systemInfo
 * launchScene 小程序启动参数不会因app onshow而变化
 * launchReferrerInfo 小程序启动参数不会因app onshow而变化
 * scene referrerInfo app onshow更新
 * example ：
 * import system from '@utils/system';
 * const {info, update, launchInfo} = system;
 */

interface ISystemInfo extends WechatMiniprogram.SystemInfo {
    environment?: string;
}

interface IInfoData extends ISystemInfo {
    launchScene: number;
    launchReferrerInfo: Record<string, unknown>;
    launchUrlQuery: Record<string, unknown>;
    scene: number;
    referrerInfo: Record<string, unknown>;
    networkType: string;
    enableDebug: boolean;
    navBarHeight: number;
    tabBarHeight: number;

    isIos: boolean;
    isAndroid: boolean;
    isIPhoneX: boolean;
    isPC: boolean;  
    isWxwork: boolean;
}

let systemInfoData: ISystemInfo;
export function getSystemInfoSync() {
    if (systemInfoData) {
        return systemInfoData;
    }
    systemInfoData = wx.getSystemInfoSync();
    return systemInfoData;
}

class SystemInfo {
    private infoData: IInfoData | Record<string, unknown>;
    constructor() {
        this.infoData = {};
    }

    // 按需调用
    tryInit() {
        if (!this.infoData.SDKVersion) {
            const system = getSystemInfoSync();
            this.infoData = {
                ...system,
                launchScene: 1000, // 其他来源
                launchReferrerInfo: {},
                launchUrlQuery: {},
                scene: 1000, // 其他来源
                referrerInfo: {},
                networkType: 'unknown',
                enableDebug: system.enableDebug,
                navBarHeight: system.statusBarHeight + 45,
                tabBarHeight: 48 + (this.needFitIpx(system) ? 34 : 0),

                isIos: /ios/i.test(system.system || ''),
                isAndroid: /android/i.test(system.system || ''),
                isIPhoneX: this.needFitIpx(system),
                isPC: /mac|windows/.test(system.platform || ''), // 是否是pc版小程序
                isWxwork: system.environment === 'wxwork', //
            };
        }
    }

    get info() {
        this.tryInit();
        return this.infoData as IInfoData;
    }

    /**
   * onshow 时更新 scene referrerInfo
   *
   * @param {number} options.scene
   * @param {object} options.referrerInfo
   */
    update(options: WechatMiniprogram.App.LaunchShowOption) {
        this.tryInit();
        const { scene = 1000, referrerInfo = {}} = options || {};
        this.infoData.scene = scene;
        this.infoData.referrerInfo = referrerInfo;
    }

    /**
   * onlaunch 设置 launchScene launchReferrerInfo launchUrlQuery
   * @param {number} options.scene launchScene
   * @param {object} options.referrerInfo launchReferrerInfo
   * @param {object} options.query launchUrlQuery
   */
    launchInfo(options: WechatMiniprogram.App.LaunchShowOption) {
        this.tryInit();
        const { scene = 1000, referrerInfo = {}, query = {}} = options || {};
        this.infoData.launchScene = scene;
        this.infoData.launchReferrerInfo = referrerInfo;
        this.infoData.launchUrlQuery = query;
        this.update(options);
    }
    /**
   * 是否需要适配 ipx
   */
    private needFitIpx(system: WechatMiniprogram.SystemInfo) {
        try {
            const { screenWidth, screenHeight, model } = system;
            if (
                model.match(/iphone/i) &&
        [
            '375-812', // iphonex iphonexs iphone12mini
            '414-896', // iPhone XS Max iPhone XR
            '428-926', // iPhone pro max
            '390-844'
        ].includes(`${screenWidth}-${screenHeight}`)
            ) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}

const system = new SystemInfo();

wx.onNetworkStatusChange((res) => {
    system.info['networkType'] = res.networkType;
});

export default system;
