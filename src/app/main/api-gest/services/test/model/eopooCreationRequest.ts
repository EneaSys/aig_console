/**
 * entityManager
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */import { EopooCreationRequestGeneric } from './eopooCreationRequestGeneric';
import { EopooCreationRequestPerson } from './eopooCreationRequestPerson';


export interface EopooCreationRequest { 
    eopooTypeId: number;
    taxNumber: string;
    name?: string;
    generic?: EopooCreationRequestGeneric;
    person?: EopooCreationRequestPerson;
}