/**
 * Esse módulo exporta o tipo enum EnumHttpVerb para informar qual o tipo de verbo http usado nas rotas da aplicação.
 * @module EnumHttpMethod
 */

enum EnumHttpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Patch = 'PATCH'
 }
 
 export {EnumHttpMethod};