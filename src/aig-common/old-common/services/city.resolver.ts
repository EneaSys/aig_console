import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CityResourceService, CityDTO } from 'aig-standard';

@Injectable()
export class CityResolver implements Resolve<Observable<CityDTO>> {
    constructor(private roleResourceService: CityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getCityUsingGET(id);
    }
}