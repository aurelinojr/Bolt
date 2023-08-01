"use strict";
/**
 * Esse módulo exporta o tipo enum EnumConnectorType para informar qual o ORM aue será criado pela fábrica de repositório.
 * @module EnumConnectorType
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumConnectorType = void 0;
var EnumConnectorType;
(function (EnumConnectorType) {
    EnumConnectorType[EnumConnectorType["Prisma"] = 0] = "Prisma";
    EnumConnectorType[EnumConnectorType["TypeORM"] = 1] = "TypeORM";
    EnumConnectorType[EnumConnectorType["Sequelize"] = 2] = "Sequelize";
})(EnumConnectorType || (exports.EnumConnectorType = EnumConnectorType = {}));
