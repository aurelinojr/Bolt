import { Controllers } from "../controllers/Controllers";
import { Repository } from "../repositories/Repository";
import { Service } from "../services/Service";
import { EnumHttpMethod } from "../types/generic/EnumHttpMethod";

const userController = new Controllers();

userController.addRoute(EnumHttpMethod.Get,'/users','user',[],[],['id','name','username'], new Service(Repository));
userController.addRoute(EnumHttpMethod.Get,'/users/:id','user',[],[],[],new Service(Repository));
userController.addRoute(EnumHttpMethod.Post,'/users','user',[],['email','name','username'],[],new Service(Repository));
userController.addRoute(EnumHttpMethod.Put,'/users/:id','user',[],[],[],new Service(Repository));
userController.addRoute(EnumHttpMethod.Delete,'/users/:id','user',[],[],[],new Service(Repository));

const RouteUser = userController.routes();

export {RouteUser}