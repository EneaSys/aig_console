import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { PersonalizationDTO, PersonalizationResourceService } from "aig-management";
import { Observable } from "rxjs";

@Injectable()
export class AigPersonalizationResolver implements Resolve<Observable<PersonalizationDTO>> {

    constructor(private personalizationResourceService: PersonalizationResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var idPersonalization: number = +route.paramMap.get('id');
        return this.personalizationResourceService.getPersonalizationUsingGET(idPersonalization);
    }
}