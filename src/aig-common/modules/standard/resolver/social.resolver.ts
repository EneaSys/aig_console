import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialResourceService, SocialDTO } from 'aig-standard';

@Injectable()
export class SocialResolver implements Resolve<Observable<SocialDTO>> {
    constructor(private socialResourceService: SocialResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.socialResourceService.getSocialUsingGET(id);
    }
}