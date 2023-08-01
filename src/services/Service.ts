import { ParamsDictionary } from 'express-serve-static-core';
import { IService } from "./IService";
import { IRepository } from '../repositories/IRepository';
import { Utils } from '../util/utils';

export class Service<Model> implements IService<Model>{

    constructor(private repository: IRepository<any>) {
       this.repository = repository; 
    }

    resultDTO(data: any[], hideFields: string[]) : any {      
      if (!data || !Array.isArray(data)) {         
        let rec = Utils.getDTOfromData(data, hideFields);
        return rec;
      }           
      const dto = data.map((rec) => {
        rec = Utils.getDTOfromData(rec, hideFields);
        return rec;
      });
      return dto;
    }

    async exists(model: Model, params: ParamsDictionary, realNames: string[]) : Promise<boolean>{
      let newParams = Utils.replaceKeysWithArray(params, realNames);  
      const result = await this.repository.exists(model,newParams);
      return !!result;
    }

    async search(model: Model, params: ParamsDictionary, realNames: string[], hideFields: string[]) : Promise<any>{
      let newParams = Utils.replaceKeysWithArray(params, realNames);          
      let ret = await this.repository.search(model,newParams);
      ret = this.resultDTO(ret, hideFields); 
      return ret;
    }
    
    async insert(model: Model, data: JSON, hideFields: string[]) : Promise<any>{
      let ret = await this.repository.create(model, data); 
      ret = this.resultDTO(ret, hideFields); 
      return ret;
    }

    async update(model: Model, params: ParamsDictionary, realNames: string[], hideFields: string[], data: JSON) : Promise<any>{
      let newParams = Utils.replaceKeysWithArray(params, realNames);
      let ret = await this.repository.update(model, newParams, data); 
      ret = this.resultDTO(ret, hideFields); 
      return ret;
    }
    
    async delete(model: Model, params: ParamsDictionary, realNames: string[]) : Promise<boolean>{
      let newParams = Utils.replaceKeysWithArray(params, realNames);
      const ret = await this.repository.delete(model,newParams); 
      return ret;
    }    
}
