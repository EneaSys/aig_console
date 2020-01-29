// import { Resolve } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { CityService } from './city.service';

// type EntityArrayResponseType = HttpResponse<any[]>;

// @Injectable()
// export class CityResolver implements Resolve<Observable<EntityArrayResponseType>> {
//   constructor(
//     private cityService: CityService
//   ) {}

//   resolve() {
//     return this.cityService.query();
//   }
// }

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityResourceService, CityDTO } from 'api-gest';

@Injectable()
export class CityResolver implements Resolve<Observable<CityDTO>> {
    constructor(private roleResourceService: CityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idCity: number = +route.paramMap.get('id');
        console.log(idCity);
        return this.roleResourceService.getCityUsingGET(idCity);
    }
}