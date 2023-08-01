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
exports.Service = void 0;
const utils_1 = require("../util/utils");
class Service {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    resultDTO(data, hideFields) {
        if (!data || !Array.isArray(data)) {
            return utils_1.Utils.getDTOfromData(data, hideFields);
        }
        const dto = data.map((rec) => {
            rec = utils_1.Utils.getDTOfromData(rec, hideFields);
            return rec;
        });
    }
    exists(model, params, realNames) {
        return __awaiter(this, void 0, void 0, function* () {
            let newParams = utils_1.Utils.replaceKeysWithArray(params, realNames);
            const result = yield this.repository.exists(model, newParams);
            return !!result;
        });
    }
    search(model, params, realNames, hideFields) {
        return __awaiter(this, void 0, void 0, function* () {
            let newParams = utils_1.Utils.replaceKeysWithArray(params, realNames);
            let ret = yield this.repository.search(model, newParams);
            ret = this.resultDTO(ret, hideFields);
            return ret;
        });
    }
    insert(model, data, hideFields) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.repository.create(model, data);
            ret = this.resultDTO(ret, hideFields);
            return ret;
        });
    }
    update(model, params, realNames, hideFields, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let newParams = utils_1.Utils.replaceKeysWithArray(params, realNames);
            let ret = yield this.repository.update(model, newParams, data);
            ret = this.resultDTO(ret, hideFields);
            return ret;
        });
    }
    delete(model, params, realNames) {
        return __awaiter(this, void 0, void 0, function* () {
            let newParams = utils_1.Utils.replaceKeysWithArray(params, realNames);
            const ret = yield this.repository.delete(model, newParams);
            return ret;
        });
    }
}
exports.Service = Service;
