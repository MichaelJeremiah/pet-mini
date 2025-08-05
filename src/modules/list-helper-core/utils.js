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
exports.__esModule = true;
exports.qs = exports.merge = exports.noop = exports.omit = void 0;
/**
 * 移除指定字段
 * 这个方法 lodash 中有，但是为了 Pagination 不包含任何依赖，所以这里自己实现了
 * @param data
 * @param keys
 */
function omit(data, keys) {
    var fake = __assign({}, data);
    keys.forEach(function (key) {
        delete fake[key];
    });
    return fake;
}
exports.omit = omit;
function noop() { }
exports.noop = noop;
function get(obj, key) {
    // @ts-ignore
    return obj[key];
}
function merge(current, defaultObj, override) {
    if (typeof defaultObj !== "object") {
        return current;
    }
    if (current === null || current === undefined) {
        return defaultObj;
    }
    return Object.keys(defaultObj)
        .map(function (key) {
        var _a, _b, _c;
        var defaultValue = get(defaultObj, key);
        if (override) {
            return _a = {},
                _a[key] = defaultValue,
                _a;
        }
        if (get(current, key) === undefined) {
            // current[key] = defaultValue;
            return _b = {},
                _b[key] = defaultValue,
                _b;
        }
        return _c = {},
            _c[key] = get(current, key),
            _c;
    })
        .reduce(function (result, prev) {
        return __assign(__assign({}, result), prev);
    }, current);
}
exports.merge = merge;
exports.qs = {
    parse: function (search) {
        if (search === "" || search === "?") {
            return {};
        }
        var s = search;
        if (search[0] === "?") {
            s = search.slice(1);
        }
        var keyValues = s.split("&");
        return keyValues
            .map(function (keyValue) {
            var _a;
            var _b = keyValue.split("="), key = _b[0], value = _b[1];
            return _a = {},
                _a[key] = value,
                _a;
        })
            .reduce(function (whole, prev) {
            return __assign(__assign({}, whole), prev);
        }, {});
    },
    stringify: function (obj) {
        if (typeof obj !== "object") {
            return "";
        }
        return Object.keys(obj)
            .map(function (key) {
            return key + "=" + obj[key];
        })
            .join("&");
    }
};
