import system from '@modules/system';
import { IAnyObject } from '@typings';

import extConfig from '../ext';

import { isArray, isDate, isNumber, isObject, isUnDef } from './is';

export const toJson = (obj: any, pretty?: number | undefined) => {
    if (isUnDef(obj)) return undefined;
    if (!isNumber(pretty)) {
        pretty = pretty ? 2 : undefined;
    }
    return JSON.stringify(obj, null, pretty);
};

export const serializeValue = (value: any) => {
    if (isObject(value)) return isDate(value) ? value.toISOString() : toJson(value);
    return value;
};

export const encodeUriQuery = (value: string, pctEncodeSpaces?: boolean) => {
    return encodeURIComponent(value)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
};

export const paramSerializer = (obj: any) => {
    if (!obj) return '';
    const parts: string[] = [];
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (value === null || isUnDef(value)) return;
        if (isArray(value)) {
            (value as Array<unknown>).forEach((v: unknown) => {
                parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(v)));
            });
        } else {
            parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(value)));
        }
    });
    return parts.join('&');
};

// 拼接链接
export const generateUrl = (url: string, obj: IAnyObject) => {
    const serializedParams = paramSerializer(obj);
    if (serializedParams.length > 0) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
};

// 是否展示小绿点
let isShowDebug: boolean;
export const checkShowDebug = () => {
    if (isShowDebug !== undefined) {
        return isShowDebug;
    }
    // 仅开发人员小绿点工具常在
    // const OPENIDS = [];
    // const openid = 'test';
    // const isDeveloper = OPENIDS.includes(openid);
    const isDeveloper = false;

    // 开发环境小绿点工具常在
    const isDevelopment = extConfig.env === 'development'; // extConfig.env === 'development';

    // 是否是通过扫体验版进入 1017
    // 1037 通过小程序助手 appid wxcff7381e631cf54e
    // lanunchScene 是启动时的scene不会改变的
    const { launchScene, launchReferrerInfo = {}, platform } = system.info;
    // 小程序助手appid
    const HELPERAPPID = 'wxcff7381e631cf54e';
    const isTrial = 1017 === launchScene || (1037 === launchScene && launchReferrerInfo.appId === HELPERAPPID);

    // 是否开发工具
    const isDevelopTool = platform === 'devtools';

    const showDebug = isDeveloper || isDevelopment || isTrial || isDevelopTool;
    isShowDebug = showDebug;
    return showDebug;
};

// 开启小绿点
export const setShowDebug = () => {
    isShowDebug = !isShowDebug;
};

// 函数防抖
/*
 * fn [function] 需要防抖的函数
 * delay [number] 毫秒，防抖期限值
 */
export function debounce(fn: (param: any) => void, delay: number) {
    let timer: any = null;
    return function (p: any) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn(p), delay);
    };
}

export function parseScene(content: string) {
    const scene = decodeURIComponent(content);
    const segments = scene.split('&');
    return segments
        .map((segment) => {
            const [key, ...value] = segment.split('=');
            return {
                [key]: value.join('=')
            };
        })
        .reduce((result, cur) => {
            return { ...result, ...cur };
        }, {});
}

export function getCurrentPage<T>() {
    const pages = getCurrentPages();
    return pages[pages.length - 1] as T & WechatMiniprogram.Page.TrivialInstance;
}

export function getRect(
    context: WechatMiniprogram.Component.TrivialInstance,
    selector: string
) {
    return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>(
        (resolve) => {
            wx.createSelectorQuery()
                .in(context)
                .select(selector)
                .boundingClientRect()
                .exec((rect = []) => resolve(rect[0]));
        }
    );
}
