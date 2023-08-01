"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const Connector_1 = require("../connectors/database/Connector");
/**
 * Esse módulo exporta o Repositório do connector utilizado através da função getRepositoty do objeto connector.
 * O objeto repositório utiliza o padrão facade para acessar o objeto do ORM utilizado.
 * @module Repository
 */
const Repository = Connector_1.Connector.getRepository();
exports.Repository = Repository;
