import { Prisma, PrismaClient } from "@prisma/client";
import { IRepository } from "./IRepository";
import { ModelType } from "../types/prisma/ModelType";
import { ParamsDictionary } from 'express-serve-static-core';

/**
 * Classe que representa um CRUD Repositório genérico qualquer que nesse caso aqui é o PrismaClient.
 *
 * @class
 */

class PrismaRepository implements IRepository<PrismaClient> {
  
   /**
   * Cria uma instância de Carro.
   * @constructor
   * @param {PrismaClient} prisma - recebe um objeto qualquer de um ORM que nesse caso aqui é o PrismaClient.
   */
    constructor(private prisma: PrismaClient) {
      this.prisma = prisma;
    }
   /**
   * Efetua a opração de criação do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
   * @Param {JSON} data - Indica o BODY da requisição que representa os dados a serem armazenados no banco de dados.
   * @returns {Promise<any>} Retorna uma promise
   */
    async create(model : ModelType, data : JSON) : Promise<any> {
      const result = await (this.prisma[model] as any).create({
        data : data
      });
      return result;
    }
   /**
   * Efetua a opração de busca do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
   */   
    async exists(model : ModelType, params : ParamsDictionary) : Promise<boolean> {
      const result = await (this.prisma[model] as any).findUnique({
        where : params
      }); 
      return !!result;
    }
     /**
   * Efetua a opração de busca do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<any>} Retorna os registros encontrados.
   */   
     async search(model : ModelType, params : ParamsDictionary) : Promise<any> {
      const result = await (this.prisma[model] as any).findMany({
        where : params
      }); 
      return result;
    }  
   /**
   * Efetua a opração de alteração do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
   * @Param {KeyValuePair} key - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @Param {JSON} data - Indica o BODY da requisição que representa os dados a serem modificados no banco de dados. 
   * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
   */   
    async update(model : ModelType, params : ParamsDictionary, data : JSON) : Promise<any> {
      const result = await (this.prisma[model] as any).updateMany({
        where: params,
         data: data
      }); 
      return result;
    }
   /**
   * Efetua a opração de deleção do registro no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<boolean>} Retorna um valor true (deletou) false(não deletou).
   */   
    async delete(model : ModelType, params : ParamsDictionary) : Promise<boolean> {
      const result = await (this.prisma[model] as any).delete({
        where : params
      });   
      return !!result;
    }
   /**
   * Efetua a opração de busca de todos os registros da tabela informada no banco de dados.
   * @method
   * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
   * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
   * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
   */   
    async getAll(model : ModelType) : Promise<any> {
      const result = await (this.prisma[model] as any).findMany(); 
      return result;     
    }

   /**
   * Efetua a opração de busca de todos os registros da tabela informada no banco de dados.
   * @method
   * @param {TemplateStringsArray} query - Indica o sql a ser executado de forma nativa pelo ORM utilizado.
   * @Param {any[]} values - Indica um array de parâmetros do sql informado no parâmetro query a ser executado pelo ORM utilizado.
   * @returns {Promise<any>} Retorna o resultado da query informada.
   */   
    async nativeQuery(query: TemplateStringsArray, ...values: any[]) : Promise<any> {
      const data = await this.prisma.$queryRaw(query, ...values);
      return data;  
    }
}

export {PrismaRepository};
