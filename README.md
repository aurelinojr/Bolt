# Bolt
/**
 * Descrição geral da API.
 *
 * @fileoverview Essa API Restful tem o objetivo de facilitar o desenvolvimento de aplicações em Node.js, minimizando 
 * a escrita de código e criação de arquivos no padrão MVC para CRUD - (Create, Read, Update e Delete).
 * @version 1.0.0
 *
 * @description
 * Esta API Restful foi construída com o objetivo de fornecer funcionalidades prontas para facilitar o desenvolvimento de
 * aplicações utilizando o padrão MVC. 
 * 
 * Padrões de projetos utilizados: (Facade, Singleton, Abtract Factory, Factory, MVC)
 * 
 * Ela possui algumas funcionalidades como: 
 * 
 * 1. Uso de fábrica para qualquer ORM (Prisma, Sequelize, TypeORM etc... Desde que implemente as interfaces).
 * 2. Mensageria com RabbitMQ (Produtor e Consumidor).
 * 3. Validação de campos da requisição.
 * 4. Controladores com serviço default para CRUD pronto e extensível para funcionalidades específicas.
 * 5. Criação de rotas de forma simples, com apenas uma linha de código e funcionalidade pronta para cada método HTTP para agilizar 
 *    o processo de desenvolvimento.
 * 
 * Funcionamento:
 * 
 * Deve-se definir as rotas dos endpoint no arquivo rotas.ts como mostra o exemplo abaixo:
 * 
 * O método addRoute deve ser informado os seguintes parâmetros: 
 * 1. O método HTTP.
 * 2. A rota (endpoint). 
 * 3. O model(entidade/tabela) do ORM. 
 * 4. Os nomes reais dos campos porque se o nome do parâmetro seguido do caracter ":", pode ser diferente da 
 *    tabela e você pode especificar o nome do campo real para não ocorrer um erro, 5 parâmetro é uma lista de 
 *    campos requeridos para serem validados antes do body ser enviado para o repositório.
 * 5. Lista de campos requeridos para evitar que os dados sejam validados no repositório.
 * 6. Lista de campos que não devem aparecer no resultado
 * 7. Serviço específico que pode ser estendido da classe Service para que seja chamado na rota informada.
 * 
 * controllers.addRoute(EnumHttpMethod.Get,'/users/:id','user',[],[],[], new Service(Repository));
 * controllers.addRoute(EnumHttpMethod.Post,'/users','user',[],['email','name','username'],[], new Service(Repository));
 * 
 * A unidade src/connectores/Connector.ts informa a aplicação qual conector ela deve utilizar, como mostra a linha de código abaixo:
 * 
 * const Connector : IConnectorFactory<any> = new ConnectorFactory().Connector(EnumConnectorType.Prisma);
 * 
 * A interface IConnectorFactory fornece o contrato para a criação de uma fábrica de conectores, com o conector e o repositório dele, 
 * que nesse caso está sendo utilizado o PrismaClient, podendo ser qualquer um outro desde que seja implemetado. A interface IRepositório
 * é um contrato para implementação de um facade para os métodos de CRUD do conector utilizado, implementado na classe PrismaRepository.
 * 
 * A unidade src/repositories/Repository.ts exporta o repositório do conector selecionado na unidade Connector. Isso é muito importante porque basta
 * mudá-lo na unidade Connector.ts que todo o framwork funcionará para o conector informado, desde que esse seja implementado.
 * 
 * const Repository = Connector.getRepository();
 * 
 * O schema ORM da aplicação está no arquivo src/prisma/schema.prisma.ts
 * 
 * O middler de validação dos campos da requisição está na unidade src/validator/Validator.ts
 * 
 * Todas as rotas desse exemplo:
 *
 * const userController = new Controllers();
 *
 * userController.addRoute(EnumHttpMethod.Get,'/users','user',[],[],['username'],new Service(Repository));
 * userController.addRoute(EnumHttpMethod.Get,'/users/:id','user',[],[],[],new Service(Repository));
 * userController.addRoute(EnumHttpMethod.Post,'/users','user',[],['email','name','username'],[],new Service(Repository));
 * userController.addRoute(EnumHttpMethod.Put,'/users/:id','user',[],[],[],new Service(Repository));  
 * userController.addRoute(EnumHttpMethod.Delete,'/users/:id','user',[],[],[],new Service(Repository));
 * 
 * Essas linhas acima criam um CRUD de usuários.
 * 
 * Para que possa enviar e receber mensagens para o RabbitMQ é preciso criar uma variável de ambiente <CLOUDAMQP_URL> e fornecer a url
 * de conexão. Essa variável é utilizada na class RabbitMQ.
 *  
 * Mais informações sobre cada endpoint estão disponíveis na documentação individual de cada função/módulo.
 *
 * @author
 * Aurelino Ferreira dos Santos Junior
 *
 * @see
 * contato: aurelino.ferreira@gmail.com
 */
