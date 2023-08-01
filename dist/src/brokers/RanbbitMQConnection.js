"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQConnection = void 0;
const RabbitMQ_1 = require("./RabbitMQ");
const rabbitMQConnection = new RabbitMQ_1.RabbitMQ();
exports.rabbitMQConnection = rabbitMQConnection;
rabbitMQConnection.on('connected', (obj) => {
    console.log('conectado');
    obj.consumer('qu_bolt');
});
rabbitMQConnection.on('consumed', (message) => {
    console.log(message);
});
process.on('SIGINT', () => {
    rabbitMQConnection.disconnect();
    console.log('desconectado');
    process.exit(0);
});
rabbitMQConnection.connect();
