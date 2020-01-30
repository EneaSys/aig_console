import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CpvResourceService, CpvDTO } from 'aig-standard';

// @Injectable()
// export class CpvSystemResolver implements Resolve<Observable<CpvDTO>> {
//     constructor(private cpvResourceService: CpvResourceService) { }

//     resolve(route: ActivatedRouteSnapshot) {
//         var idCpvSystem: number = +route.paramMap.get('id');
//         return this.cpvResourceService.getCpvUsingGET(idCpvSystem);
//     }
// }

/* Test */
@Injectable()
export class CpvSystemResolver {
    constructor(private cpvResourceService: CpvResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idCpvSystem: number = +route.paramMap.get('id');
        
        var res = {id: idCpvSystem, name: "Santa Maria la Carità", code: "Q72613", wikiCode: "Q72613"}
        return res;
    }
}