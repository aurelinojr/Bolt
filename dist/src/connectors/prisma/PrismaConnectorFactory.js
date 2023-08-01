"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaConnectorFactory = void 0;
const client_1 = require("@prisma/client");
const PrismaRepository_1 = require("../../repositories/PrismaRepository");
let instance;
/**
 * Classe que representa a implementação de um conector que nesse caso é o prisma.
 * @class
 */
class PrismaConnectorFactory {
    /**
    * Obtem o conector ORM para o banco de dados (Padrão singleton).
    * @method
    * @returns {Connector} Retorna a instância do objeto objeto ORM utilizado.
    */
    getConnector() {
        if (instance == null) {
            instance = new client_1.PrismaClient();
        }
        return instance;
    }
    /**
    * Obtem o Repositório ORM para o banco de dados.
    * @method
    * @returns {IRepository<Connector>} Retorna a instância do objeto Repositório (facade) do ORM utilizado.
    */
    getRepository() {
        return new PrismaRepository_1.PrismaRepository(this.getConnector());
    }
}
exports.PrismaConnectorFactory = PrismaConnectorFactory;
