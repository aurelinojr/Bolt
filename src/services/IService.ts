import { ParamsDictionary } from 'express-serve-static-core';

export interface IService<Model> {
    
    resultDTO(data: any, hideFields: string[]) : any;
    
    exists(model: Model, params: ParamsDictionary, realNames: string[]) : Promise<boolean>;

    search(model: Model, params: ParamsDictionary, realNames: string[], hideFields: string[]) : Promise<any>;
      
    insert(model: Model, data: JSON, hideFields: string[]) : Promise<any>;
  
    update(model: Model, params: ParamsDictionary, realNames: string[], hideFields: string[], data: JSON) : Promise<any>
      
    delete(model: Model, params: ParamsDictionary, realNames: string[]) : Promise<boolean>;
    
}