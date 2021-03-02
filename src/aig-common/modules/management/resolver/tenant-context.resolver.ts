import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TenantContextDTO, TenantContextResourceService } from 'aig-management';
import { Observable } from 'rxjs';

@Injectable()
export class AigTenantContextResolver implements Resolve<Observable<TenantContextDTO>> {

    constructor(private tenantContextResourceService: TenantContextResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idTenantContext: number = +route.paramMap.get('id');
        return this.tenantContextResourceService.getTenantContextUsingGET(idTenantContext);
    }
}