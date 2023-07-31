import {EnumConnectorType} from '../types/generic/EnumConnectorType';
import { IConnectorFactory } from './IConnectorFactory';

/**
 * Classe abstrata para para obter fábrica de conector (Padrão Abstract Factory).
 * @class
 */
abstract class AbstractConnectorFactory {
   /**
   * Obtem o objeto conector ORM para o banco de dados.
   * @method
   * @param {EnumConnectorType} ConnectorType - Indica o tipo de connector ORM definido no Enum (Prisma, Sequelize, TypeORM etc...) .
   * @returns {IConnectorFactory<any>} Retorna a instância do objeto fábrica do ORM utilizado.
   */  
    abstract Connector(ConnectorType : EnumConnectorType) : IConnectorFactory<any>;  
}

export {AbstractConnectorFactory};