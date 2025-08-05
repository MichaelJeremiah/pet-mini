"use strict";
exports.__esModule = true;
exports.DEFAULT_PARAMS = exports.DEFAULT_RESPONSE = exports.DEFAULT_TOTAL = exports.DEFAULT_CURRENT_PAGE = exports.DEFAULT_PAGE_SIZE = void 0;
exports.DEFAULT_PAGE_SIZE = 10;
exports.DEFAULT_CURRENT_PAGE = 1;
exports.DEFAULT_TOTAL = 0;
exports.DEFAULT_RESPONSE = {
    dataSource: [],
    page: exports.DEFAULT_CURRENT_PAGE,
    pageSize: exports.DEFAULT_PAGE_SIZE,
    total: exports.DEFAULT_TOTAL,
    search: {},
    initial: true,
    noMore: false,
    loading: false,
    refreshing: undefined
};
exports.DEFAULT_PARAMS = {
    page: exports.DEFAULT_CURRENT_PAGE,
    pageSize: exports.DEFAULT_PAGE_SIZE
};
