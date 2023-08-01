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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQ = void 0;
const amqp_client_1 = require("@cloudamqp/amqp-client");
const events_1 = __importDefault(require("events"));
let connection = null;
const cloudAMQPURL = process.env.CLOUDAMQP_URL;
class RabbitMQ extends events_1.default {
    constructor() {
        super(...arguments);
        this.channel = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connection == null) {
                    connection = new amqp_client_1.AMQPClient(cloudAMQPURL);
                    yield connection.connect();
                    this.channel = yield connection.channel();
                    this.emit('connected', this);
                }
            }
            catch (error) {
                this.emit('error', error);
            }
            finally {
                return connection;
            }
        });
    }
    disconnect() {
        if (connection) {
            if (this.channel) {
                this.channel.close();
            }
            connection.close();
            this.emit('disconnected', this);
        }
    }
    exchangeDeclare(name, type, exchangeParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                return yield this.channel.exchangeDeclare(name, type, exchangeParams);
            }
            else {
                throw new Error('Não existe um canal da conexão RabbitMQ!');
            }
        });
    }
    queue(name, queueParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                return yield this.channel.queue(name);
            }
            else {
                throw new Error('Não existe um canal da conexão RabbitMQ!');
            }
        });
    }
    queueBind(queue, exchange, routingKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                return yield this.channel.queueBind(queue, exchange, routingKey);
            }
            else {
                throw new Error('Não existe um canal da conexão RabbitMQ!');
            }
        });
    }
    sendMessage(queue, body, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                const q = yield this.channel.queue(queue);
                return yield q.publish(body);
            }
            else {
                throw new Error('Não existe uma coxeão com RabbitMQ!');
            }
        });
    }
    consumer(queue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel) {
                let counter = 0;
                const q = yield this.channel.queue(queue);
                const consumer = yield q.subscribe({ noAck: false }, (msg) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        this.emit('consumed', `[${++counter}] Mensaggem recebida (${msg.bodyToString()})`);
                        msg.ack();
                    }
                    catch (error) {
                        this.emit('consumed', `erro: Mensagem Número [${++counter}] (${JSON.stringify(error)})`);
                    }
                }));
            }
        });
    }
    getChannel() {
        return this.channel;
    }
    getConnection() {
        return connection;
    }
    isConnected() {
        return (connection && connection.closed);
    }
}
exports.RabbitMQ = RabbitMQ;
