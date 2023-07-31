import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { EnumHttpMethod } from '../types/generic/EnumHttpMethod';
import { Utils } from '../util/utils';


const ListValidator: Map<string, string[]> = new Map();


export const addValidator = (httpVerb: EnumHttpMethod, route: string, required: string[]): void => {
   const key: string = Utils.createRouteKey(httpVerb, route);
   ListValidator.set(key,required);
}

const validateRequestBody = (body: ParamsDictionary, required: string[]) : string => {
   if (required.length > 0) { 
     const absent: string[] = []; 
     const Keys = Object.keys(body);
     let field: string = '';
     for (let index=0; index < required.length; index++) {
       field = required[index];
       if (Keys.indexOf(field) < 0) {
         absent.push(`*${field}`); 
       }
     }
     if (absent.length>0) {
       return `Campos requeridos: (${required.join(',')}) faltando: (${absent.join(',')})`;
     }
   } 
   return '';
}


const Validator = ((request: Request, response: Response, next: NextFunction) => {
  try {
    const key = Utils.createRouteKey(request.method as EnumHttpMethod, request.url);
    const found = ListValidator.get(key);    
    if (found) {
        const error = validateRequestBody(request.body, found);
        if (error) {
          response.status(500).json({error : error});  
          return;
        }
    }  
    next();
 } catch (error) {
    return next(error); 
 }   
});

export {Validator}