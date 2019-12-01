import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ApolloDocumentType'})
export class ApolloDocumentTypePipe implements PipeTransform {
    transform(type: any): any {
        switch (type) {
            case '21':
                return "FA";
            case '29':
                return "FE";
            case '46':
                return "NCC";
            case '47':
                return "NFC";
            case '78':
                return "PRO";
            case '79':
                return "FdR";
            case '83':
                return "FEPA";
            case '85':
                return "ND";
            default:
                return "!!>>" + type;
        }
    }
}