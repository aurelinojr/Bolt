"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const RouteUser_1 = require("./routes/RouteUser");
const Validator_1 = require("./validator/Validator");
const RouteRabbitMQ_1 = require("./routes/RouteRabbitMQ");
const app = (0, express_1.default)();
exports.app = app;
/*
   Configuração
*/
app.use(express_1.default.json());
app.use(Validator_1.Validator);
/*
   Início de definição das rotas da aplicação
*/
app.use(RouteUser_1.RouteUser);
app.use(RouteRabbitMQ_1.RouteRabbitMQ);
