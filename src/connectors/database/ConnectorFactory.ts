import {PrismaConnectorFactory} from '../prisma/PrismaConnectorFactory';
import {AbstractConnectorFactory} from '../AbstractConnectorFactory';
import {EnumConnectorType} from '../../types/generic/EnumConnectorType';
import { IConnectorFactory } from '../IConnectorFactory';

/**
 * Classe implementa a classe abstrata para obter o Connector fábrica (Padrão Abstract Factory).
 * @class
 */

class ConnectorFactory extends AbstractConnectorFactory {
   /**
   * Obtem o objeto conector ORM para o banco de dados.
   * @method
   * @param {EnumConnectorType} ConnectorType - Indica o tipo de connector ORM definido no Enum (Prisma, Sequelize, TypeORM etc...) .
   * @returns {IConnectorFactory<any>} Retorna a instância do objeto fábrica do ORM utilizado.
   */ 
    Connector(ConnectorType : EnumConnectorType) : IConnectorFactory<any> {
       if (ConnectorType == EnumConnectorType.Prisma) {
          return new PrismaConnectorFactory();
       }   
       throw new Error("Tipo de conector não suportado: " + ConnectorType);
    }   
}

export {ConnectorFactory};