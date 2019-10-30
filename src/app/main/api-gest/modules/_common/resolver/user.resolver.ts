import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserResourceService, UserDTO } from 'api-gest';

@Injectable()
export class UserResolver implements Resolve<Observable<UserDTO>> {
    constructor(private userResourceService: UserResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var userCode: string = route.paramMap.get('userCode');
        return this.userResourceService.getUserUsingGET(userCode);
    }
}