import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityDTO, CityResourceService } from 'aig-standard';

@Injectable()
export class CityResolver implements Resolve<Observable<CityDTO>> {
    constructor(
        private cityResourceService: CityResourceService
    ) {}

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.cityResourceService.getCityUsingGET(id);
    }
}


