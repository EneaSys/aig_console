import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContextUserDTO, ContextUserResourceService } from 'aig-entity-manager';
import { Observable } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<Observable<ContextUserDTO>> {
    constructor(private userResourceService: ContextUserResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var userId: number = +route.paramMap.get('userCode');
        return this.userResourceService.getContextUserUsingGET(userId);
    }
}