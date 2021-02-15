import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { EntityReferenceDTO, EntityReferenceResourceService } from "api-gest";
import { Observable } from "rxjs";

@Injectable()
export class AigEntityReferenceResolver implements Resolve<Observable<EntityReferenceDTO>> {

    constructor(private entityReferenceResourceService: EntityReferenceResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idEntityReference: number = +route.paramMap.get('id');
        return this.entityReferenceResourceService.getEntityReferenceUsingGET(idEntityReference);
    }
}