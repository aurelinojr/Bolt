import { Connector } from "../connectors/database/Connector";

/**
 * Esse módulo exporta o Repositório do connector utilizado através da função getRepositoty do objeto connector.
 * O objeto repositório utiliza o padrão facade para acessar o objeto do ORM utilizado.
 * @module Repository
 */

const Repository = Connector.getRepository();

export {Repository}