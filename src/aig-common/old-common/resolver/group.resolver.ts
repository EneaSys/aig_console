import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContextGroupResourceService, ContextGroupDTO } from 'api-gest';

@Injectable()
export class GroupResolver implements Resolve<Observable<ContextGroupDTO>> {
    constructor(private contextGroupResourceService: ContextGroupResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.contextGroupResourceService.getContextGroupUsingGET(id);
    }
}