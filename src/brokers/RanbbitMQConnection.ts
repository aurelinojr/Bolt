import { RabbitMQ } from "./RabbitMQ";

const rabbitMQConnection = new RabbitMQ();

rabbitMQConnection.on('connected',(obj : RabbitMQ) => {
  console.log('conectado');
  obj.consumer('qu_bolt'); 
});

rabbitMQConnection.on('consumed',(message) => {
  console.log(message);  
});

process.on('SIGINT',() => {
  rabbitMQConnection.disconnect();
  console.log('desconectado');  
  process.exit(0);
});


rabbitMQConnection.connect();


export {rabbitMQConnection}

