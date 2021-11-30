import { Pipe, PipeTransform } from '@angular/core';
import { EopooDTO } from 'aig-generic';

@Pipe({name: 'eopooName'})
export class EopooNamePipe implements PipeTransform {

    transform(eopoo: EopooDTO): string {
		if(eopoo == null || eopoo.eopooType == null) {
			return "INVALID";
		}
		
        switch (eopoo.eopooType.eopooCategory) {
            case 'GENERIC':
                return eopoo.genericEopoo.name;
            case 'PERSON':
                return eopoo.person.firstname + " " + eopoo.person.lastname;
            default:
                return "INVALID";
        }
    }
    
}