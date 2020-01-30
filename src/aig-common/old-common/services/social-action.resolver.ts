import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';

@Injectable()
export class ActionResolver implements Resolve<Observable<SocialActionDTO>> {
    constructor(private roleResourceService: SocialActionResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('fdsafdsa');
        var id: number = +route.paramMap.get('id');
        return this.roleResourceService.getSocialActionUsingGET(id);
    }
}