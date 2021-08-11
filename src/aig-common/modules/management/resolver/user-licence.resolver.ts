import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {  LicenzeDTO, LicenzeResourceService, UserLicenzeDTO, UserLicenzeResourceService } from 'aig-management';
import { Observable } from 'rxjs';

@Injectable()
export class AigUserLicenceResolver implements Resolve<Observable<UserLicenzeDTO>> {

    constructor(private userLicenceResourceService: UserLicenzeResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idUserLicence: number = +route.paramMap.get('id');
        return this.userLicenceResourceService.getUserLicenzeUsingGET(idUserLicence);
    }
}