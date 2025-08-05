import { RequestResponse, FetchParams, Response, Search, InitialOptions } from "./typing";
/**
 * @deprecated
 */
export declare function debug(): void;
/**
 * 分页类
 */
declare class Helper<T> {
    static defaultResponse: {
        [x: string]: any;
        dataSource: any[];
        page: number;
        pageSize: number;
        total: number;
        search: Search;
        initial: boolean;
        noMore: boolean;
        loading: boolean;
        refreshing?: boolean;
        error?: Error;
    };
    static defaultProcessor: (originalResponse: RequestResponse) => {
        dataSource: any;
        page: any;
        pageSize: any;
        total: any;
        noMore: boolean;
    } | {
        dataSource: any[];
        page: number;
        pageSize: number;
        total: number;
        noMore: boolean;
        error: Error;
    };
    static onSearchChange: (pathname: string) => void;
    static onError: (err: Error) => void;
    private originalFetch?;
    private beforeRequest;
    private fakeProcessor;
    debug: boolean;
    memo: boolean;
    rowKey: string;
    private initialParams;
    private extraResponse;
    private params;
    response: Response<T>;
    onChange(data: Response<T>): void;
    onError(err: Error): void;
    constructor(fetch: any, options?: InitialOptions);
    log: (...messages: any[]) => void;
    /**
     * 调用接口进行请求
     * @param {PaginationParams} nextParams - 查询参数
     */
    fetch: (...args: any[]) => Promise<Response<T>>;
    /**
     * 使用初始参数请求一次，初始化时可调用该方法
     */
    init: (params?: Search) => Promise<Response<T>>;
    /**
     * 下一页
     */
    next: () => Promise<Response<T>>;
    /**
     * 无限加载时使用的下一页
     */
    loadMore: () => Promise<Response<T>>;
    /**
     * 返回上一页
     */
    prev: () => Promise<Response<T>>;
    /**
     * 前往指定页码
     * @param {number} page - 要前往的页码
     * @param {number} [pageSize] - 每页数量
     */
    goto: (page: number, pageSize?: number) => Promise<Response<T>>;
    /**
     * 筛选
     */
    search: (params: Search) => Promise<Response<T>>;
    /**
     * 排序
     */
    sort: (sorter: Record<string, "ascend" | "descend">) => Promise<Response<T>>;
    /**
     * 使用初始参数请求
     */
    reset: (extraParams?: Record<string, any>) => Promise<Response<T>>;
    /**
     * 使用当前参数重新请求一次，常用于 PC 端表格「刷新」
     * @param params
     */
    reload: () => Promise<Response<T>>;
    /**
     * 页码置为 1，其他参数保留，重新请求一次，常用于移动端列表「刷新」
     */
    refresh: () => Promise<Response<T>>;
    /**
     * 改变每页数量
     * @param nextPageSize
     */
    changeSize: (nextPageSize: number) => Promise<Response<T>>;
    /**
     * 移除列表中的多项（用在删除场景）
     * @param item
     */
    deleteItems: <T_1 = any>(items: T_1[]) => Promise<Response<T>>;
    /**
     * 使用原始 fetch 进行请求，不会影响已有 page、params 等
     * @param params
     */
    private tempFetch;
    /**
     * 清除所有数据，恢复到默认值
     */
    clean: () => Promise<Response<T>>;
    /**
     * 修改当前 response
     * @param processor
     */
    modifyResponse: (processor: (response: Response<T>) => Response<T>) => Promise<Response<T>>;
    /**
     * 修改当前 params
     */
    modifyParams: (fn: (params: FetchParams) => FetchParams) => Promise<Response<T>>;
    /**
     * 修改当前 params
     */
    modifySearch: (fn: (params: Search) => Search) => Promise<Response<T>>;
    /**
     * 修改 dataSource 中的指定元素
     * @param index
     * @param newItem
     */
    modifyItem: (newItem: T, index?: number | string) => void;
    private resolve;
}
export default Helper;
