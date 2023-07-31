import { ParamsDictionary } from 'express-serve-static-core';
import { EnumHttpMethod } from '../types/generic/EnumHttpMethod';
import { DtoType } from '../types/generic/DtoType';

class Utils {
    
    static replaceKeysWithArray(params: ParamsDictionary, realNames: string[]) : ParamsDictionary {
        const len: number = ((realNames) ? realNames.length : 0);
        if (len > 0) {     
          const currentKeys = Object.keys(params);          
          for (let index=0; index < currentKeys.length; index++) {
            const currentKey = currentKeys[index];
            const currentName = realNames[index];
            if (currentKey != currentName) {              
              params[currentName] = params[currentKey];
              delete params[currentKey];
            }  
          }
        }  
        return params;
    }    

    static getDTOfromData(data : any, hideFields: string[]) : any {
      const len: number = ((hideFields) ? hideFields.length : 0);
      if (data && len > 0) {    
        const currentKeys = Object.keys(data); 
        let dto : DtoType = {}; 
        for (let index=0; index < currentKeys.length; index++) {
          const currentKey = currentKeys[index];
          if (hideFields.indexOf(currentKey) < 0) {
            dto[currentKey] = data[currentKey];
          }  
        }
        return dto;
      }  
      return data;
    }    

    static createRouteKey(httpVerb: EnumHttpMethod, route: string): string {
      return `${httpVerb}_${route}`;
    }
    
}     

export {Utils}