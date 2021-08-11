import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TenantContextDTO, TenantContextResourceService, TypeCategoryReferenceDTO, TypeCategoryReferenceResourceService } from 'aig-management';
import { Observable } from 'rxjs';

@Injectable()
export class AigTypeCategoryReferenceResolver implements Resolve<Observable<TypeCategoryReferenceDTO>> {

    constructor(private typeCategoryReferenceResourceService: TypeCategoryReferenceResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idTypeCategoryReference: number = +route.paramMap.get('id');
        return this.typeCategoryReferenceResourceService.getTypeCategoryReferenceUsingGET(idTypeCategoryReference);
    }
}