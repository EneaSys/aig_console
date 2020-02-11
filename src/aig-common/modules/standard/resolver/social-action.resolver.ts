import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';

@Injectable()
export class ActionResolver implements Resolve<Observable<SocialActionDTO>> {
    constructor(private socialActionResourceService: SocialActionResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.socialActionResourceService.getSocialActionUsingGET(id);
    }
}