"use strict";
/**
 * Esse módulo exporta o tipo enum EnumHttpVerb para informar qual o tipo de verbo http usado nas rotas da aplicação.
 * @module EnumHttpMethod
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumHttpMethod = void 0;
var EnumHttpMethod;
(function (EnumHttpMethod) {
    EnumHttpMethod["Get"] = "GET";
    EnumHttpMethod["Post"] = "POST";
    EnumHttpMethod["Put"] = "PUT";
    EnumHttpMethod["Delete"] = "DELETE";
    EnumHttpMethod["Patch"] = "PATCH";
})(EnumHttpMethod || (exports.EnumHttpMethod = EnumHttpMethod = {}));
