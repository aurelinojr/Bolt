# Bolt
/**
* General description of the API.
* @fileoverview This Restful API aims to facilitate the development of Node.js applications, minimizing
* the need for writing code and creating MVC pattern files for CRUD - (Create, Read, Update, and Delete).
* @version 1.0.0
* @description
* This Restful API was built with the purpose of providing ready-made functionalities to ease the development of
* applications using the MVC pattern.
* Design patterns used: (Facade, Singleton, Abstract Factory, Factory, MVC)
* It offers several features, including:
* - Using a factory for any ORM (Prisma, Sequelize, TypeORM, etc... as long as they implement the interfaces).
* - Messaging with RabbitMQ (Producer and Consumer).
* - Request field validation.
* - Controllers with a default CRUD service that can be extended for specific functionalities.
* - Simple route creation with just one line of code, and ready-made functionality for each HTTP method to streamline
*   the development process.
* How it works:
* Endpoint routes should be defined in the "rotas.ts" file, as shown in the example below:
* The "addRoute" method should be provided with the following parameters:
* - The HTTP method.
* - The route (endpoint).
* - The ORM model (entity/table).
* - The actual names of fields, because if the parameter name followed by ":" differs from the table's field name,
*   you can specify the real field name to avoid errors.
* - The fifth parameter is a list of required fields that will be validated before the body is sent to the repository.
* - A list of fields that should not appear in the result.
* - A specific service that can be extended from the Service class and called on the specified route.
* Example of adding routes:
* controllers.addRoute(EnumHttpMethod.Get, '/users/:id', 'user', [], [], [], new Service(Repository));
* controllers.addRoute(EnumHttpMethod.Post, '/users', 'user', [], ['email', 'name', 'username'], [], new Service(Repository));
* The unit "src/connectors/Connector.ts" informs the application which connector to use, as shown in the following line of code:
* const Connector: IConnectorFactory = new ConnectorFactory().Connector(EnumConnectorType.Prisma);
* The "IConnectorFactory" interface provides the contract for creating a connector factory, with the connector and its repository,
* in this case, the PrismaClient is being used, but it can be any other as long as it is implemented.
* The "IRepository" interface is a contract for implementing a facade for the CRUD methods of the used connector,
* implemented in the "PrismaRepository" class.
* The "src/repositories/Repository.ts" unit exports the repository of the selected connector in the "Connector" unit.
* This is very important because by changing it in the "Connector.ts" unit, the entire framework will work for the specified connector,
* as long as it is implemented.
* const Repository = Connector.getRepository();
* The ORM schema of the application is in the "src/prisma/schema.prisma.ts" file.
* The request field validation middleware is in the "src/validator/Validator.ts" unit.
* All routes in this example:
* const userController = new Controllers();
* userController.addRoute(EnumHttpMethod.Get, '/users', 'user', [], [], ['username'], new Service(Repository));
* userController.addRoute(EnumHttpMethod.Get, '/users/:id', 'user', [], [], [], new Service(Repository));
* userController.addRoute(EnumHttpMethod.Post, '/users', 'user', [], ['email', 'name', 'username'], [], new Service(Repository));
* userController.addRoute(EnumHttpMethod.Put, '/users/:id', 'user', [], [], [], new Service(Repository));
* userController.addRoute(EnumHttpMethod.Delete, '/users/:id', 'user', [], [], [], new Service(Repository));
* The above lines create a CRUD for users.
* To send and receive messages to RabbitMQ, it is necessary to create an environment variable called "<CLOUDAMQP_URL>"
* and provide the connection URL. This variable is used in the "RabbitMQ" class.
* For more information about each endpoint, refer to the individual documentation of each function/module.
* @author
* Aurelino Ferreira dos Santos Junior
* @see
* Contact: aurelino.ferreira@gmail.com
*/
