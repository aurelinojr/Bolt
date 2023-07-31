import { PrismaClient } from '@prisma/client';
import { PrismaRepository } from '../../repositories/PrismaRepository';
import { IRepository } from '../../repositories/IRepository';
import { IConnectorFactory } from '../../connectors/IConnectorFactory'

let instance : PrismaClient; 

/**
 * Classe que representa a implementação de um conector que nesse caso é o prisma.
 * @class
 */

class PrismaConnectorFactory implements IConnectorFactory<PrismaClient> {
   /**
   * Obtem o conector ORM para o banco de dados (Padrão singleton).
   * @method
   * @returns {Connector} Retorna a instância do objeto objeto ORM utilizado.
   */
    getConnector() : PrismaClient {
       if (instance == null) {
         instance = new PrismaClient();
       } 
       return instance;  
    }
    /**
    * Obtem o Repositório ORM para o banco de dados.
    * @method
    * @returns {IRepository<Connector>} Retorna a instância do objeto Repositório (facade) do ORM utilizado.
    */  
    getRepository() : IRepository<PrismaClient> {
      return new PrismaRepository(this.getConnector());
    }
}

export {PrismaConnectorFactory};