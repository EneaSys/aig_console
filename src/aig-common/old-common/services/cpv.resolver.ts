import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CpvResourceService, CpvDTO } from 'aig-standard';

@Injectable()
export class CpvResolver implements Resolve<Observable<CpvDTO>> {
    constructor(private roleResourceService: CpvResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('fdsafdsa');
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getCpvUsingGET(id);
    }
}