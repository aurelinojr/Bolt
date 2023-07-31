/**
 * Esse módulo exporta o tipo enum EnumConnectorType para informar qual o ORM aue será criado pela fábrica de repositório.
 * @module EnumConnectorType
 */

enum EnumConnectorType {
   Prisma,
   TypeORM,
   Sequelize
}

export {EnumConnectorType};