import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { EntityReferenceDTO, ObjectReferenceResourceService, ObjectReferenceDTO, FieldReferenceDTO, FieldReferenceResourceService } from "aig-management";
import { Observable } from "rxjs";

@Injectable()
export class AigFieldReferenceResolver implements Resolve<Observable<FieldReferenceDTO>> {

    constructor(private fieldReferenceResourceService: FieldReferenceResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idFieldReference: number = +route.paramMap.get('id');
        return this.fieldReferenceResourceService.getFieldReferenceUsingGET(idFieldReference);
    }
}