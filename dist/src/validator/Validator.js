"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.addValidator = void 0;
const utils_1 = require("../util/utils");
const ListValidator = new Map();
const addValidator = (httpVerb, route, required) => {
    const key = utils_1.Utils.createRouteKey(httpVerb, route);
    ListValidator.set(key, required);
};
exports.addValidator = addValidator;
const validateRequestBody = (body, required) => {
    if (required.length > 0) {
        const absent = [];
        const Keys = Object.keys(body);
        let field = '';
        for (let index = 0; index < required.length; index++) {
            field = required[index];
            if (Keys.indexOf(field) < 0) {
                absent.push(`*${field}`);
            }
        }
        if (absent.length > 0) {
            return `Campos requeridos: (${required.join(',')}) faltando: (${absent.join(',')})`;
        }
    }
    return '';
};
const Validator = ((request, response, next) => {
    try {
        const key = utils_1.Utils.createRouteKey(request.method, request.url);
        const found = ListValidator.get(key);
        if (found) {
            const error = validateRequestBody(request.body, found);
            if (error) {
                response.status(500).json({ error: error });
                return;
            }
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.Validator = Validator;
