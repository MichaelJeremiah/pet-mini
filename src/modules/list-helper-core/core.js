"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.debug = void 0;
/**
 * @file 分页领域
 * 如果某个查询参数不对，请求后已经保存了该参数，永远都会使用该参数请求，之后必须要在 init 请求
 */
var constants_1 = require("./constants");
var utils_1 = require("./utils");
/**
 * 只处理
 * @param originalResponse
 * @returns
 */
var RESPONSE_PROCESSOR = function (originalResponse) {
    try {
        var data = originalResponse.data || originalResponse;
        var list = data.list, page = data.page, pageSize = data.pageSize, total = data.total, isEnd = data.isEnd;
        var result = {
            // ...DEFAULT_RESPONSE,
            dataSource: list,
            page: page,
            pageSize: pageSize,
            total: total,
            noMore: false
        };
        // this.log(
        //   "[DOMAIN]Pagination - RESPONSE_PROCESSOR",
        //   total <= pageSize * page
        // );
        if (total <= pageSize * page) {
            result.noMore = true;
        }
        if (isEnd !== undefined) {
            result.noMore = isEnd;
        }
        return result;
    }
    catch (error) {
        // this.log("[DOMAIN]Pagination - RESPONSE_PROCESSOR fail", error);
        //
        return {
            // ...DEFAULT_RESPONSE,
            dataSource: [],
            page: 1,
            pageSize: constants_1.DEFAULT_PAGE_SIZE,
            total: constants_1.DEFAULT_TOTAL,
            noMore: false,
            error: new Error("process response fail, because " + error.message)
        };
    }
};
/**
 * @deprecated
 */
function debug() {
    console.warn("[deprecated]该方法已被弃用，请使用 debug 配置项。");
}
exports.debug = debug;
// @ts-ignore
var onSearchChange = function (pathname) { };
/**
 * 分页类
 */
var Helper = /** @class */ (function () {
    function Helper(fetch, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // 支持请求前对参数进行处理（formToBody）
        this.beforeRequest = function (currentParams, prevParams) {
            return __assign(__assign({}, prevParams), currentParams);
        };
        // 响应处理器
        this.fakeProcessor = RESPONSE_PROCESSOR;
        this.debug = false;
        this.memo = false;
        this.params = __assign({}, constants_1.DEFAULT_PARAMS);
        // 响应数据
        this.response = __assign({}, constants_1.DEFAULT_RESPONSE);
        this.log = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            if (_this.debug) {
                console.log.apply(console, messages);
            }
        };
        /**
         * 调用接口进行请求
         * @param {PaginationParams} nextParams - 查询参数
         */
        this.fetch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, params, _b, options, userParamsForThisRequest, mergedParams, tempProcessedParams, originalResponse, response, itemResponseIsEmpty, concat, prevItems, err_1, thisInvokeIsRefresh;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = args[0], params = _a === void 0 ? {} : _a, _b = args[1], options = _b === void 0 ? {} : _b;
                            userParamsForThisRequest = __assign({}, params);
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            if (this.response.initial === false) {
                                this.response.loading = true;
                                this.onChange(__assign({}, this.response));
                            }
                            // 这次请求不是刷新，所以要重置为 undefined，避免影响业务方认为这次是一次刷新请求
                            if (this.response.refreshing === false) {
                                this.response.refreshing = undefined;
                            }
                            mergedParams = __assign(__assign({}, this.params), userParamsForThisRequest);
                            this.response.search = utils_1.omit(mergedParams, ["page", "pageSize"]);
                            tempProcessedParams = this.beforeRequest(__assign(__assign({}, this.params), userParamsForThisRequest), this.params);
                            if (tempProcessedParams === undefined) {
                                tempProcessedParams = __assign(__assign({}, this.params), userParamsForThisRequest);
                            }
                            this.log("%c CORE %c " + this.originalFetch.name + " %c 1\u3001beforeRequest ", "color:white;background:#dfa639;border-top-left-radius:2px;border-bottom-left-radius:2px;", "color:white;background:#19be6b;border-top-right-radius:2px;border-bottom-right-radius:2px;", "color:#19be6b;", tempProcessedParams);
                            return [4 /*yield*/, this.originalFetch(tempProcessedParams)];
                        case 2:
                            originalResponse = _c.sent();
                            response = this.fakeProcessor(originalResponse);
                            if (response === undefined) {
                                response = Helper.defaultProcessor(originalResponse);
                            }
                            this.log("%c CORE %c " + this.originalFetch.name + " %c 3\u3001afterProcessor ", "color:white;background:#dfa639;border-top-left-radius:2px;border-bottom-left-radius:2px;", "color:white;background:#19be6b;border-top-right-radius:2px;border-bottom-right-radius:2px;", "color:#19be6b;", response);
                            itemResponseIsEmpty = response.dataSource === undefined;
                            if (itemResponseIsEmpty) {
                                response.dataSource = [];
                            }
                            concat = options.concat;
                            if (concat === true) {
                                prevItems = this.response.dataSource;
                                response.dataSource = prevItems.concat(response.dataSource);
                            }
                            this.response = __assign(__assign({}, this.response), response);
                            if (this.response.initial === true) {
                                this.response.initial = false;
                            }
                            if (this.response.error !== undefined) {
                                this.response.error = undefined;
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _c.sent();
                            if (Helper.onError) {
                                Helper.onError(err_1);
                            }
                            this.onError(err_1);
                            this.log("[DOMAIN]pagination - fetch failed:", err_1);
                            this.response.error = err_1;
                            if (this.response.initial === true) {
                                this.response.initial = false;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            this.response.loading = false;
                            thisInvokeIsRefresh = this.response.refreshing === true;
                            if (thisInvokeIsRefresh) {
                                this.response.refreshing = false;
                            }
                            // 最终保存的查询参数，只是简单地合并两个对象
                            this.params = __assign(__assign({}, this.params), userParamsForThisRequest);
                            this.log("%c CORE %c " + this.originalFetch.name + " %c 4\u3001response ", "color:white;background:#dfa639;border-top-left-radius:2px;border-bottom-left-radius:2px;", "color:white;background:#515a6e;border-top-right-radius:2px;border-bottom-right-radius:2px;", "color:#515a6e;", this.response);
                            return [2 /*return*/, this.resolve()];
                    }
                });
            });
        };
        /**
         * 使用初始参数请求一次，初始化时可调用该方法
         */
        this.init = function (params) {
            if (params === void 0) { params = {}; }
            _this.params = __assign(__assign({}, _this.initialParams), params);
            // this.response.initial = true;
            return _this.fetch(_this.params);
        };
        /**
         * 下一页
         */
        this.next = function () {
            _this.params.page += 1;
            return _this.fetch(_this.params);
        };
        /**
         * 无限加载时使用的下一页
         */
        this.loadMore = function () {
            _this.params.page += 1;
            return _this.fetch(_this.params, { concat: true });
        };
        /**
         * 返回上一页
         */
        this.prev = function () {
            _this.params.page -= 1;
            if (_this.params.page <= 0) {
                _this.params.page = constants_1.DEFAULT_CURRENT_PAGE;
            }
            return _this.fetch(_this.params);
        };
        /**
         * 前往指定页码
         * @param {number} page - 要前往的页码
         * @param {number} [pageSize] - 每页数量
         */
        this.goto = function (page, pageSize) {
            // const { pathname, search } = window.location;
            // const query = qs.parse(search);
            // if (page !== undefined) {
            //   query.page = String(page);
            // }
            _this.params.page = page;
            if (pageSize !== undefined) {
                _this.params.pageSize = pageSize;
                // query.pageSize = String(pageSize);
            }
            // const nextHref = pathname + qs.stringify(query);
            // this.log(
            //   `%c CORE %c ${this.originalFetch.name} %c goto `,
            //   "color:white;background:#dfa639;border-top-left-radius:2px;border-bottom-left-radius:2px;",
            //   "color:white;background:#515a6e;border-top-right-radius:2px;border-bottom-right-radius:2px;",
            //   "color:#515a6e;",
            //   nextHref,
            //   query
            // );
            // if (this.memo) {
            //   Helper.onSearchChange(nextHref);
            // }
            return _this.fetch(__assign({}, _this.params));
        };
        /**
         * 筛选
         */
        this.search = function (params) {
            return _this.fetch(__assign(__assign({}, _this.initialParams), params));
        };
        /**
         * 排序
         */
        this.sort = function (sorter) {
            _this.log("%c CORE %c " + _this.originalFetch.name + " %c sort ", "color:white;background:#dfa639;border-top-left-radius:2px;border-bottom-left-radius:2px;", "color:white;background:#515a6e;border-top-right-radius:2px;border-bottom-right-radius:2px;", "color:#515a6e;", sorter);
            // 排序
            var SORT_TYPE = {
                ascend: "asc",
                descend: "desc"
            };
            var params = Object.keys(sorter)
                .map(function (field) {
                if (sorter[field] === undefined) {
                    return null;
                }
                return {
                    field: field,
                    order: SORT_TYPE[sorter[field]]
                };
            })
                .filter(Boolean);
            _this.params.sort = params;
            if (params.length === 0) {
                delete _this.params.sort;
            }
            return _this.fetch();
        };
        /**
         * 使用初始参数请求
         */
        this.reset = function (extraParams) {
            if (extraParams === void 0) { extraParams = {}; }
            _this.params = __assign(__assign({}, _this.initialParams), extraParams);
            return _this.fetch({});
        };
        /**
         * 使用当前参数重新请求一次，常用于 PC 端表格「刷新」
         * @param params
         */
        this.reload = function () {
            return _this.fetch(_this.params);
        };
        /**
         * 页码置为 1，其他参数保留，重新请求一次，常用于移动端列表「刷新」
         */
        this.refresh = function () {
            _this.params.page = 1;
            _this.response.refreshing = true;
            return _this.fetch(_this.params);
        };
        /**
         * 改变每页数量
         * @param nextPageSize
         */
        this.changeSize = function (nextPageSize) {
            _this.params = __assign(__assign({}, _this.params), { pageSize: nextPageSize });
            return _this.fetch(_this.params);
        };
        /**
         * 移除列表中的多项（用在删除场景）
         * @param item
         */
        this.deleteItems = function (items) { return __awaiter(_this, void 0, void 0, function () {
            var _a, dataSource, total, nextDataSource, originalResponse, nextResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.response, dataSource = _a.dataSource, total = _a.total;
                        nextDataSource = dataSource.filter(function (existingItem) {
                            // @ts-ignore
                            return !items.includes(existingItem);
                        });
                        if (nextDataSource.length >= total - 1) {
                            this.response = __assign(__assign({}, this.response), { dataSource: nextDataSource, total: total - 1 });
                            return [2 /*return*/, this.resolve()];
                        }
                        return [4 /*yield*/, this.tempFetch(__assign({ page: dataSource.length, pageSize: items.length }, utils_1.omit(this.params, ["page", "pageSize"])))];
                    case 1:
                        originalResponse = _b.sent();
                        nextResponse = this.fakeProcessor(originalResponse);
                        this.response = __assign(__assign(__assign({}, this.response), nextResponse), { dataSource: nextDataSource.concat(nextResponse.dataSource) });
                        return [2 /*return*/, this.resolve()];
                }
            });
        }); };
        /**
         * 使用原始 fetch 进行请求，不会影响已有 page、params 等
         * @param params
         */
        this.tempFetch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.originalFetch.apply(_this, args);
        };
        /**
         * 清除所有数据，恢复到默认值
         */
        this.clean = function () {
            _this.response = __assign(__assign({}, constants_1.DEFAULT_RESPONSE), _this.extraResponse);
            _this.params = __assign(__assign({}, constants_1.DEFAULT_PARAMS), _this.initialParams);
            return _this.resolve();
        };
        /**
         * 修改当前 response
         * @param processor
         */
        this.modifyResponse = function (processor) {
            _this.response = processor(_this.response);
            return _this.resolve();
        };
        /**
         * 修改当前 params
         */
        this.modifyParams = function (fn) {
            _this.params = fn(_this.params);
            return _this.resolve();
        };
        /**
         * 修改当前 params
         */
        this.modifySearch = function (fn) {
            _this.params = __assign(__assign({}, fn(utils_1.omit(_this.params, ["page", "pageSize"]))), { page: _this.params.page, pageSize: _this.params.pageSize });
            return _this.resolve();
        };
        /**
         * 修改 dataSource 中的指定元素
         * @param index
         * @param newItem
         */
        this.modifyItem = function (newItem, index) {
            if (index === void 0) { index = _this.rowKey; }
            var dataSource = _this.response.dataSource;
            var itemIndexWantToModify = index;
            if (typeof index === "string") {
                itemIndexWantToModify = dataSource.findIndex(
                // @ts-ignore
                function (data) { return data[index] === newItem[index]; });
            }
            // const itemWantToModify = dataSource[itemIndexWantToModify];
            var nextItem = newItem;
            // 支持 newItem 传入函数？
            var nextDataSource = __spreadArray(__spreadArray(__spreadArray([], dataSource.slice(0, itemIndexWantToModify)), [
                nextItem
            ]), dataSource.slice(itemIndexWantToModify + 1));
            _this.response.dataSource = nextDataSource;
            _this.resolve();
        };
        if (typeof fetch !== "function") {
            throw new Error("fetch must be a function");
        }
        var debug = options.debug, memo = options.memo, _a = options.rowKey, rowKey = _a === void 0 ? "id" : _a, beforeRequest = options.beforeRequest, processor = options.processor, search = options.search, dataSource = options.dataSource, page = options.page, pageSize = options.pageSize, extraDefaultResponse = options.extraDefaultResponse, restOptions = __rest(options, ["debug", "memo", "rowKey", "beforeRequest", "processor", "search", "dataSource", "page", "pageSize", "extraDefaultResponse"]);
        this.debug = !!debug;
        this.memo = !!memo;
        this.rowKey = rowKey;
        this.originalFetch = fetch;
        if (processor) {
            this.fakeProcessor = function (originalResponse) {
                var nextResponse = __assign(__assign({}, _this.response), RESPONSE_PROCESSOR(originalResponse));
                _this.log("%c CORE %c " + _this.originalFetch.name + " %c 2\u3001beforeProcessor ", "color:white;background:#dfa639;border-top-left-radius:2px;border-bottom-left-radius:2px;", "color:white;background:#ff9900;border-top-right-radius:2px;border-bottom-right-radius:2px;", "color:#ff9900;", nextResponse, originalResponse);
                return processor(nextResponse, originalResponse);
            };
        }
        if (beforeRequest !== undefined) {
            this.beforeRequest = beforeRequest;
        }
        //
        if (this.memo) {
            // read query from url
        }
        this.initialParams = utils_1.merge(restOptions, constants_1.DEFAULT_PARAMS);
        this.extraResponse = __assign({}, extraDefaultResponse);
        if (search !== undefined) {
            this.initialParams = __assign(__assign({}, this.initialParams), search);
            // this.response.search = search;
            this.extraResponse.search = search;
            // defaultResponse.search = search;
        }
        if (dataSource !== undefined) {
            // this.response.dataSource = dataSource;
            this.extraResponse.dataSource = dataSource;
            // defaultResponse.dataSource = dataSource;
        }
        if (page !== undefined) {
            this.initialParams.page = page;
            // this.response.page = page;
            this.extraResponse.page = page;
            // this.search.page = pageSize;
            // defaultResponse.page = page;
        }
        if (pageSize !== undefined) {
            this.initialParams.pageSize = pageSize;
            // this.search.pageSize = pageSize;
            // this.response.pageSize = pageSize;
            this.extraResponse.pageSize = pageSize;
            // defaultResponse.pageSize = pageSize;
        }
        this.params = __assign({}, this.initialParams);
        this.response = __assign(__assign({}, Helper.defaultResponse), this.extraResponse);
    }
    // @ts-ignore
    Helper.prototype.onChange = function (data) {
    };
    // @ts-ignore
    Helper.prototype.onError = function (err) { };
    Helper.prototype.resolve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.onChange(__assign({}, this.response));
                return [2 /*return*/, this.response];
            });
        });
    };
    Helper.defaultResponse = __assign({}, constants_1.DEFAULT_RESPONSE);
    Helper.defaultProcessor = RESPONSE_PROCESSOR;
    Helper.onSearchChange = onSearchChange;
    return Helper;
}());
exports["default"] = Helper;
