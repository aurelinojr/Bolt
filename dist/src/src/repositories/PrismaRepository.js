"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRepository = void 0;
/**
 * Classe que representa um CRUD Repositório genérico qualquer que nesse caso aqui é o PrismaClient.
 *
 * @class
 */
class PrismaRepository {
    /**
    * Cria uma instância de Carro.
    * @constructor
    * @param {PrismaClient} prisma - recebe um objeto qualquer de um ORM que nesse caso aqui é o PrismaClient.
    */
    constructor(prisma) {
        this.prisma = prisma;
        this.prisma = prisma;
    }
    /**
    * Efetua a opração de criação do registro no banco de dados.
    * @method
    * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
    * @Param {JSON} data - Indica o BODY da requisição que representa os dados a serem armazenados no banco de dados.
    * @returns {Promise<any>} Retorna uma promise
    */
    create(model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma[model].create({
                data: data
            });
            return result;
        });
    }
    /**
    * Efetua a opração de busca do registro no banco de dados.
    * @method
    * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
    * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
    * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
    */
    exists(model, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma[model].findUnique({
                where: params
            });
            return !!result;
        });
    }
    /**
  * Efetua a opração de busca do registro no banco de dados.
  * @method
  * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
  * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
  * @returns {Promise<any>} Retorna os registros encontrados.
  */
    search(model, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma[model].findMany({
                where: params
            });
            return result;
        });
    }
    /**
    * Efetua a opração de alteração do registro no banco de dados.
    * @method
    * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
    * @Param {KeyValuePair} key - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
    * @Param {JSON} data - Indica o BODY da requisição que representa os dados a serem modificados no banco de dados.
    * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
    */
    update(model, params, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma[model].updateMany({
                where: params,
                data: data
            });
            return result;
        });
    }
    /**
    * Efetua a opração de deleção do registro no banco de dados.
    * @method
    * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
    * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
    * @returns {Promise<boolean>} Retorna um valor true (deletou) false(não deletou).
    */
    delete(model, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma[model].deleteMany({
                where: params
            });
            return !!result;
        });
    }
    /**
    * Efetua a opração de busca de todos os registros da tabela informada no banco de dados.
    * @method
    * @param {ModelType} model - Indica a tabela do modelo schema definido no src/schema.prisma.
    * @Param {ParamsDictionary} params - Indica um objeto de chave e valor para informar o campo da tabela utilizado para buscar os dados.
    * @returns {Promise<boolean>} Retorna um valor true (encontrou) false(não encontrou).
    */
    getAll(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma[model].findMany();
            return result;
        });
    }
    /**
    * Efetua a opração de busca de todos os registros da tabela informada no banco de dados.
    * @method
    * @param {TemplateStringsArray} query - Indica o sql a ser executado de forma nativa pelo ORM utilizado.
    * @Param {any[]} values - Indica um array de parâmetros do sql informado no parâmetro query a ser executado pelo ORM utilizado.
    * @returns {Promise<any>} Retorna o resultado da query informada.
    */
    nativeQuery(query, ...values) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.prisma.$queryRaw(query, ...values);
            return data;
        });
    }
}
exports.PrismaRepository = PrismaRepository;
