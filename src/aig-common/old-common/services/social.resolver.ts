import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialResourceService, SocialActionDTO } from 'aig-standard';

@Injectable()
export class SocialResolver implements Resolve<Observable<SocialActionDTO>> {
    constructor(private roleResourceService: SocialResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('fdsafdsa');
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getSocialUsingGET(id);
    }
}