export interface RequestResponse {
    [key: string]: any;
}
export interface Search {
    [key: string]: any;
}
export interface Response<T> {
    dataSource: T[];
    page: number;
    pageSize: number;
    total: number;
    search: Search;
    initial: boolean;
    noMore: boolean;
    loading: boolean;
    refreshing?: boolean;
    error?: Error;
    [key: string]: any;
}
export declare type OriginalResponseProcessor = <T>(originalResponse: RequestResponse) => Omit<Response<T>, "dataSource" | "page" | "pageSize" | "noMore" | "error">;
export declare type ResponseProcessor = <T>(response: Omit<Response<T>, "dataSource" | "page" | "pageSize" | "noMore" | "error">, originalResponse: RequestResponse) => Omit<Response<T>, "dataSource" | "page" | "pageSize" | "noMore" | "error">;
export declare type ParamsProcessor = (params: FetchParams, currentParams: any) => FetchParams;
export interface FetchParams extends Search {
    page: number;
    pageSize: number;
}
export interface InitialOptions {
    debug?: boolean;
    memo?: boolean;
    rowKey?: string;
    beforeRequest?: ParamsProcessor;
    processor?: ResponseProcessor;
    dataSource?: any[];
    search?: Search;
    page?: number;
    pageSize?: number;
    extraDefaultResponse?: Record<string, any>;
}
export interface IExtraOptions {
    init?: boolean;
    concat?: boolean;
}
