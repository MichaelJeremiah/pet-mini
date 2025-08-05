export type IAnyObject = Record<string, any>

export interface IAppOption extends WechatMiniprogram.App {
  globalData: {
    userInfo?: IAnyObject;
  };
  extConfig: IAnyObject;
  init: () => void;
  initUpdateManager: () => void;
}

export interface IResponseType<T = any> {
  code: number;
  statusCode: number;
  message: string;
//   nowTime: number;
  data: T;
}
