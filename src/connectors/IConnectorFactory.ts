import { IRepository } from "../repositories/IRepository";

/**
 * @interface
 * @desc Interface para representar uma fábrica de connector ORM e o seu facade para acesso aos seus metodos.
 */

interface IConnectorFactory<Connector> {
   /**
   * Obtem o conector ORM para o banco de dados.
   * @method
   * @returns {Connector} Retorna a instância do objeto objeto ORM utilizado.
   */
   getConnector() : Connector; 
   /**
   * Obtem o Repositório ORM para o banco de dados.
   * @method
   * @returns {IRepository<Connector>} Retorna a instância do objeto Repositório (facade) do ORM utilizado.
   */  
   getRepository() : IRepository<Connector>
}

export {IConnectorFactory}