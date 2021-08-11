import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { EntityReferenceDTO, ObjectReferenceResourceService, ObjectReferenceDTO } from "aig-management";
import { Observable } from "rxjs";

@Injectable()
export class AigObjectReferenceResolver implements Resolve<Observable<ObjectReferenceDTO>> {

    constructor(private objectReferenceResourceService: ObjectReferenceResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idObjectReference: number = +route.paramMap.get('id');
        return this.objectReferenceResourceService.getObjectReferenceUsingGET(idObjectReference);
    }
}