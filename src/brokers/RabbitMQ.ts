import { AMQPChannel, AMQPClient, AMQPProperties, AMQPQueue, ExchangeParams, QueueParams } from '@cloudamqp/amqp-client'
import EventEmitter from 'events';
import {} from 'dotenv/config'

let connection: AMQPClient | null = null;
const cloudAMQPURL = process.env.CLOUDAMQP_URL

class RabbitMQ extends EventEmitter {
  
  channel: AMQPChannel | null = null;

  async connect() : Promise<AMQPClient> {
    
    try {
      
      if (connection == null) {
        connection = new AMQPClient(cloudAMQPURL as string); 
        await connection.connect();
        this.channel = await connection.channel();
        this.emit('connected', this);   
      }  

    } catch (error) {   

      this.emit('error', error);         

    } finally {

      return connection as AMQPClient;  

    } 
  }
  
  disconnect() {    
    if (connection) {
      if (this.channel) {
        this.channel.close();
      }
      connection.close();
      this.emit('disconnected',this);
    }  
  }

  async exchangeDeclare(name: string, type: string, exchangeParams? : ExchangeParams): Promise<void> {
    if (this.channel) {      
      return await this.channel.exchangeDeclare(name, type, exchangeParams);
    } else {
      throw new Error('Não existe um canal da conexão RabbitMQ!');  
    }  
  } 

  async queue(name?: string | undefined, queueParams?: QueueParams | undefined): Promise<AMQPQueue> {
    if (this.channel) {      
      return await this.channel.queue(name);
    } else {
      throw new Error('Não existe um canal da conexão RabbitMQ!');  
    }  
  } 

  async queueBind(queue: string, exchange: string, routingKey: string): Promise<void> {
    if (this.channel) {      
      return await this.channel.queueBind(queue, exchange, routingKey);
    } else {
      throw new Error('Não existe um canal da conexão RabbitMQ!');  
    }  
  } 

  async sendMessage(queue: string, body: string | Uint8Array | ArrayBuffer | Buffer | null, properties?: AMQPProperties | undefined): Promise<AMQPQueue> {
    if (this.channel) {
      const q = await this.channel.queue(queue);
      return await q.publish(body);      
    } else {
      throw new Error('Não existe uma coxeão com RabbitMQ!'); 
    }  
  } 

  async consumer(queue: string) {   
    if (this.channel) {
      let counter = 0;
      const q = await this.channel.queue(queue);
      const consumer = await q.subscribe({noAck: false}, async (msg) => {
        try {
          this.emit('consumed',`[${++counter}] Mensaggem recebida (${msg.bodyToString()})`);
          msg.ack();
        } catch (error) {
          this.emit('consumed',`erro: Mensagem Número [${++counter}] (${JSON.stringify(error)})`); 
        }
      });
    }  
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

export {RabbitMQ};