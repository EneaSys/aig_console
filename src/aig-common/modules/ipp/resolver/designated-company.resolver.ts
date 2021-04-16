import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DesignatedCompanyDTO, DesignatedCompanyResourceService, DossierDTO, DossierResourceService } from 'aig-italianlegislation';

@Injectable()
export class DeisgnatedCompanyResolver implements Resolve<Observable<DesignatedCompanyDTO>> {
    constructor(private designatedCompanyResourceService: DesignatedCompanyResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.designatedCompanyResourceService.getDesignatedCompanyUsingGET(id);
    }
}