/**
 * 移除指定字段
 * 这个方法 lodash 中有，但是为了 Pagination 不包含任何依赖，所以这里自己实现了
 * @param data
 * @param keys
 */
export declare function omit(data: {
    [key: string]: any;
}, keys: string[]): {
    [x: string]: any;
};
export declare function noop(): void;
export declare function merge<T = {
    [key: string]: any;
}>(current: T, defaultObj: T, override?: boolean): {
    [x: string]: any;
};
export declare const qs: {
    parse(search: string): {
        [x: string]: string;
    };
    stringify(obj: Record<string, any>): string;
};
