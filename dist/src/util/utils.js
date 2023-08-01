"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    //
    static replaceKeysWithArray(params, realNames) {
        const len = realNames.length;
        if (len > 0) {
            const currentKeys = Object.keys(params);
            let obj = {};
            for (let index = 0; index < currentKeys.length; index++) {
                const currentKey = currentKeys[index];
                if (index < len && realNames[index] != '') {
                    const newName = realNames[index];
                    obj[newName] = params[currentKey];
                }
                else {
                    obj[currentKey] = params[currentKey];
                }
            }
            return obj;
        }
        return params;
    }
    static getDTOfromData(data, hideFields) {
        const len = hideFields.length;
        if (data && len > 0) {
            const currentKeys = Object.keys(data);
            let dto = {};
            for (let index = 0; index < currentKeys.length; index++) {
                const currentKey = currentKeys[index];
                if (hideFields.indexOf(currentKey) < 0) {
                    dto[currentKey] = data[currentKey];
                }
            }
            return dto;
        }
        return data;
    }
    static createRouteKey(httpVerb, route) {
        return `${httpVerb}_${route}`;
    }
}
exports.Utils = Utils;
