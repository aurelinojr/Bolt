import express, { Express } from 'express';
import { RouteUser } from './routes/RouteUser';
import { Validator } from './validator/Validator';
import { RouteRabbitMQ } from './routes/RouteRabbitMQ';

const app : Express = express();

/*
   Configuração
*/

app.use(express.json()); 
app.use(Validator);

/*
   Início de definição das rotas da aplicação
*/

app.use(RouteUser);
app.use(RouteRabbitMQ);

/*
  Fim das rotas
*/

export {app};

