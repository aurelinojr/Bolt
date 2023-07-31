import { ParamsDictionary } from 'express-serve-static-core';

/**
 * @interface
 * @desc Interface para representar um objeto Repositório genérico para toda a aplicação.
 */

export interface IRepository<Connector> {
  /**
   * Efetua a opração de criação do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no ORM utilizado.
   * @Param {ParamsDictionary} data - Indica o BODY da requisição que representa os dados a serem armazenados no banco de dados.
   * @returns {Promise<any>} Retorna uma promise
   */
  create(model : any, data : JSON) : Promise<any>;
  /**
   * Efetua a opração de busca do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no ORM utilizado.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
   */   
  exists(model : any, params : ParamsDictionary) : Promise<boolean>;
  /**
   * Efetua a opração de busca dos registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no ORM utilizado.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<boolean>} Retorna os registros encontrados.
   */   
  search(model : any, params : ParamsDictionary) : Promise<any>;
  /**
   * Efetua a opração de alteração do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no ORM utilizado.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @Param {JSON} data - Indica o BODY da requisição que representa os dados a serem modificados no banco de dados. 
   * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
   */     
  update(model : any, params : ParamsDictionary, data : JSON) : Promise<any>;
  /**
   * Efetua a opração de deleção do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no ORM.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<boolean>} Retorna um valor true (deletou) false(não deletou).
   */     
  delete(model : any, params : ParamsDictionary) : Promise<boolean>;
  /**
   * Efetua a opração de busca de todos os registros da tabela informada no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no ORM utilizado.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
   */   
  getAll(mode  : any) : Promise<any>;

   /**
   * Efetua a opração de sql no banco de dados de forma nativa.
   * @method
   * @param {TemplateStringsArray} query - Indica o sql a ser executado de forma nativa pelo ORM utilizado.
   * @Param {any[]} values - Indica um array de parâmetros do sql informado no parâmetro query a ser executado pelo ORM utilizado.
   * @returns {Promise<any>} Retorna o resultado da query informada.
   */   
  nativeQuery(query: TemplateStringsArray, ...values: any[]) : Promise<any>;

}