import { Router} from 'express'
import { EnumHttpMethod } from '../types/generic/EnumHttpMethod';
import { IService } from '../services/IService';

export interface IControllers {

   addRoute(httpVerb: EnumHttpMethod, 
               route: string, 
               model: any, 
               realNames: string[], 
               required: string[], 
               hideFields: string[],
               baseService?: IService<any>) : any;
  
   routes() : Router;

}