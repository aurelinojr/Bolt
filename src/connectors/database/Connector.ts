/**
 * Esse módulo exporta o Connector que representa o ORM utilizado.
 * @module Connector
 */

import { EnumConnectorType } from "../../types/generic/EnumConnectorType";
import { IConnectorFactory } from "../IConnectorFactory";
import { ConnectorFactory } from "./ConnectorFactory";

const Connector : IConnectorFactory<any> = new ConnectorFactory().Connector(EnumConnectorType.Prisma);

export {Connector};

