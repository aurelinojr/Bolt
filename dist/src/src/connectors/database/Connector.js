"use strict";
/**
 * Esse módulo exporta o Connector que representa o ORM utilizado.
 * @module Connector
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = void 0;
const EnumConnectorType_1 = require("../../types/generic/EnumConnectorType");
const ConnectorFactory_1 = require("./ConnectorFactory");
const Connector = new ConnectorFactory_1.ConnectorFactory().Connector(EnumConnectorType_1.EnumConnectorType.Prisma);
exports.Connector = Connector;
