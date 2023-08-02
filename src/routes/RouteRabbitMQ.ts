import { Router} from 'express'
import { Request, Response } from 'express';
import { rabbitMQConnection } from '../brokers/RabbitMQConnection';


const RouteRabbitMQ = Router();

RouteRabbitMQ.get('/rabbitmq/:msg?', async (req : Request, res : Response) => { 

  const msg = req.params.msg;
  const result: { [key: string]: any } = {};

  if (msg) {
    result.message = msg
  } else {
    result.message = 'Envio de messagem padrão!';
    result.warning = 'O usuário não informou a mensagem na requisição!'
  } 
   
  rabbitMQConnection.exchangeDeclare('ex_bolt','direct');
  rabbitMQConnection.queue('qu_bolt');
  rabbitMQConnection.queueBind('qu_bolt','ex_bolt','rk_teste');    
  rabbitMQConnection.sendMessage('qu_bolt',JSON.stringify(result));   

  res.json(result);

});

export {RouteRabbitMQ};