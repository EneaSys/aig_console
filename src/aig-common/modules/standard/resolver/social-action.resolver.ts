import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialResourceService, SocialDTO, SocialActionDTO, SocialActionResourceService } from 'aig-standard';

@Injectable()
export class SocialActionResolver implements Resolve<Observable<SocialActionDTO>> {
    constructor(private socialActionResourceService: SocialActionResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.socialActionResourceService.getSocialActionUsingGET(id);
    }
}