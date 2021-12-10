import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EopooTypeDTO, EopooTypeResourceService, FormDataDTO, FormDataResourceService } from 'aig-generic';

@Injectable()
export class FormDataResolver implements Resolve<Observable<FormDataDTO>> {
    constructor(private formDataResourceService: FormDataResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.formDataResourceService.getFormDataUsingGET(id);
    }
}