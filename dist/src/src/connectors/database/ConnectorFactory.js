"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorFactory = void 0;
const PrismaConnectorFactory_1 = require("../prisma/PrismaConnectorFactory");
const AbstractConnectorFactory_1 = require("../AbstractConnectorFactory");
const EnumConnectorType_1 = require("../../types/generic/EnumConnectorType");
/**
 * Classe implementa a classe abstrata para obter o Connector fábrica (Padrão Abstract Factory).
 * @class
 */
class ConnectorFactory extends AbstractConnectorFactory_1.AbstractConnectorFactory {
    /**
    * Obtem o objeto conector ORM para o banco de dados.
    * @method
    * @param {EnumConnectorType} ConnectorType - Indica o tipo de connector ORM definido no Enum (Prisma, Sequelize, TypeORM etc...) .
    * @returns {IConnectorFactory<any>} Retorna a instância do objeto fábrica do ORM utilizado.
    */
    Connector(ConnectorType) {
        if (ConnectorType == EnumConnectorType_1.EnumConnectorType.Prisma) {
            return new PrismaConnectorFactory_1.PrismaConnectorFactory();
        }
        throw new Error("Tipo de conector não suportado: " + ConnectorType);
    }
}
exports.ConnectorFactory = ConnectorFactory;
