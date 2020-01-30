import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityResourceService, CityDTO } from 'api-gest';

// @Injectable()
// export class CitySystemResolver implements Resolve<Observable<CityDTO>> {
//     constructor(private cityResourceService: CityResourceService) { }

//     resolve(route: ActivatedRouteSnapshot) {
//         var idCitySystem: number = +route.paramMap.get('id');
//         return this.cityResourceService.getCityUsingGET(idCitySystem);
//     }
// }

/* Test */
@Injectable()
export class CitySystemResolver {
    constructor(private cityResourceService: CityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idCitySystem: number = +route.paramMap.get('id');
        
        var res = {id: idCitySystem, name: "Santa Maria la Carità", code: "Q72613", wikiCode: "Q72613"}
        return res;
    }
}