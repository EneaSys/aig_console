import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TenantContextDTO, TenantContextResourceService } from 'api-gest';

@Injectable()
export class AigTenantContextResolver implements Resolve<Observable<TenantContextDTO>> {

    constructor(private tenantContextResourceService: TenantContextResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idTenantContex: number = +route.paramMap.get('id');
        return this.tenantContextResourceService.getTenantContextUsingGET(idTenantContex);
    }
}