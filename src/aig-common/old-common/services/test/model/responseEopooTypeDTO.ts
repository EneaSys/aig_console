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
 */

export interface ResponseEopooTypeDTO { 
    eopooCategory: ResponseEopooTypeDTO.EopooCategoryEnum;
    id?: number;
    name: string;
}
export namespace ResponseEopooTypeDTO {
    export type EopooCategoryEnum = 'GENERIC' | 'PERSON';
    export const EopooCategoryEnum = {
        GENERIC: 'GENERIC' as EopooCategoryEnum,
        PERSON: 'PERSON' as EopooCategoryEnum
    };
}