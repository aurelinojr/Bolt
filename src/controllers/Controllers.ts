import { Router} from 'express'
import { Request, Response } from 'express'; 
import { IControllers } from './IControllers';
import { Utils } from '../util/utils';
import { addValidator } from '../validator/Validator';
import { IService } from '../services/IService';
import { EnumHttpMethod } from '../types/generic/EnumHttpMethod';


class Controllers implements IControllers {

   private routers = Router();   

   protected executeGetVerb(service: IService<any>, 
                              route: string, 
                                any: any, 
                          realNames: string[],
                          hideFields: string[]) {
     this.routers.get(route, async (req : Request, res : Response) => {  
        try {
          const result = await service.search(any,req.params, realNames, hideFields);
          res.status(200).json(result);
        } catch (error) {   
          res.status(500).json(error);  
        }            
     }); 
   }
   
   protected executePostVerb(service: IService<any>, 
                               route: string, 
                               model: any,
                          hideFields: string[]) {
     this.routers.post(route, async (req : Request, res : Response) => { 
        try {
          const result = await service.insert(model, req.body,hideFields);
          res.status(201).json(result);  
        } catch (error) {
          res.status(500).json(error);
        }        
     }); 
   }

   protected executePutVerb(service: IService<any>, 
                              route: string, 
                              model: any, 
                          realNames: string[],
                         hideFields: string[]) {
     this.routers.put(route, async (req : Request, res : Response) => {           
        try {
          const result = await service.update(model,req.params, realNames,hideFields,req.body); 
          res.status(200).json(result);
        } catch(error) {
          res.status(500).json(error);  
        } 
      }); 
   }
   
   protected executeDeleteVerb(service: IService<any>, 
                                 route: string, 
                                 model: any, 
                             realNames: string[])  {
     this.routers.delete(route, async (req : Request, res : Response) => {     
       try {        
         const result = await service.delete(model, req.params, realNames);  
         res.status(200).json(result);
       } catch(error) {
         res.status(500).json(error); 
       }     
     }); 
   }

   addRoute(httpVerb: EnumHttpMethod,
               route: string, 
               model: any, 
               realNames: string[], 
               required: string[], 
               hideFields: string[],
               service: IService<any>) : any {   
     
     addValidator(httpVerb, route, required);    
     
     switch (httpVerb) {
       case EnumHttpMethod.Get:
         this.executeGetVerb(service, route, model, realNames, hideFields);
         break;
       case EnumHttpMethod.Post:
         this.executePostVerb(service, route, model, hideFields);
         break;   
       case EnumHttpMethod.Put:
         this.executePutVerb(service, route, model, realNames, hideFields);
         break;
       case EnumHttpMethod.Delete:
         this.executeDeleteVerb(service, route, model, realNames);
         break; 
       case EnumHttpMethod.Patch:       
         break;       
       default:
         throw new Error(`Verbo http inválido para a rota: ${route}`);                 
     }   
   }

   routes() : Router {
     return this.routers;
   }

}

export {Controllers};

