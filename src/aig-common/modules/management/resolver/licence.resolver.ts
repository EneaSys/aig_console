import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {  LicenzeDTO, LicenzeResourceService } from 'aig-management';
import { Observable } from 'rxjs';

@Injectable()
export class AigLicenceResolver implements Resolve<Observable<LicenzeDTO>> {

    constructor(private licenceResourceService: LicenzeResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idLicence: number = +route.paramMap.get('id');
        return this.licenceResourceService.getLicenzeUsingGET(idLicence);
    }
}