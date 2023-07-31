/**
 * Esse módulo exporta o tipo ModelType para obter apenas os models do prisma.
 * @module ModelType
 */
import { PrismaClient } from "@prisma/client";

type ModelType = keyof Omit<
       PrismaClient,
       'disconnect' | 'connect' | 'executeRaw' | 'queryRaw' | 'transaction' | 'on'
     > 

export {ModelType};