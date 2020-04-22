import { Injectable } from '@angular/core';
import { EopooDTO } from 'aig-generic';
import { EopooNamePipe } from '../../pipe/eopoo-name.pipe';

@Injectable()
export class AigGenericAutocompleteFunctionService {
    eopooDisplayFn(eopoo?: EopooDTO): string | undefined {
        return eopoo ? new EopooNamePipe().transform(eopoo) : undefined;
    }
}