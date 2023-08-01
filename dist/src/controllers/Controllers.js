"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const express_1 = require("express");
const Validator_1 = require("../validator/Validator");
const EnumHttpMethod_1 = require("../types/generic/EnumHttpMethod");
class Controllers {
    constructor() {
        this.routers = (0, express_1.Router)();
    }
    executeGetVerb(service, route, any, realNames, hideFields) {
        this.routers.get(route, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield service.search(any, req.params, realNames, hideFields);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        }));
    }
    executePostVerb(service, route, model, hideFields) {
        this.routers.post(route, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield service.insert(model, req.body, hideFields);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        }));
    }
    executePutVerb(service, route, model, realNames, hideFields) {
        this.routers.put(route, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield service.update(model, req.params, realNames, hideFields, req.body);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        }));
    }
    executeDeleteVerb(service, route, model, realNames) {
        this.routers.delete(route, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield service.delete(model, req.params, realNames);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        }));
    }
    addRoute(httpVerb, route, model, realNames, required, hideFields, service) {
        (0, Validator_1.addValidator)(httpVerb, route, required);
        switch (httpVerb) {
            case EnumHttpMethod_1.EnumHttpMethod.Get:
                this.executeGetVerb(service, route, model, realNames, hideFields);
                break;
            case EnumHttpMethod_1.EnumHttpMethod.Post:
                this.executePostVerb(service, route, model, hideFields);
                break;
            case EnumHttpMethod_1.EnumHttpMethod.Put:
                this.executePutVerb(service, route, model, realNames, hideFields);
                break;
            case EnumHttpMethod_1.EnumHttpMethod.Delete:
                this.executeDeleteVerb(service, route, model, realNames);
                break;
            case EnumHttpMethod_1.EnumHttpMethod.Patch:
                break;
            default:
                throw new Error(`Verbo http inválido para a rota: ${route}`);
        }
    }
    routes() {
        return this.routers;
    }
}
exports.Controllers = Controllers;
