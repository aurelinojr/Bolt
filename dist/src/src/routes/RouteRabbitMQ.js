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
exports.RouteRabbitMQ = void 0;
const express_1 = require("express");
const RanbbitMQConnection_1 = require("../brokers/RanbbitMQConnection");
const RouteRabbitMQ = (0, express_1.Router)();
exports.RouteRabbitMQ = RouteRabbitMQ;
RouteRabbitMQ.get('/rabbitmq/:msg?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = req.params.msg;
    const result = {};
    if (msg) {
        result.message = msg;
    }
    else {
        result.message = 'Envio de messagem padrão!';
        result.warning = 'O usuário não informou a mensagem na requisição!';
    }
    RanbbitMQConnection_1.rabbitMQConnection.exchangeDeclare('ex_bolt', 'direct');
    RanbbitMQConnection_1.rabbitMQConnection.queue('qu_bolt');
    RanbbitMQConnection_1.rabbitMQConnection.queueBind('qu_bolt', 'ex_bolt', 'rk_teste');
    RanbbitMQConnection_1.rabbitMQConnection.sendMessage('qu_bolt', JSON.stringify(result));
    res.json(result);
}));
