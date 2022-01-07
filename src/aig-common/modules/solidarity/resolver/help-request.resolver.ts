import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodProductRequestDTO, FoodProductRequestResourceService } from 'aig-solidarety';
import { FormDataResourceService } from 'aig-generic';

@Injectable()
export class HelpRequestResolver implements Resolve<Observable<FoodProductRequestDTO>> {
    constructor(
		private foodProductRequestResourceService: FoodProductRequestResourceService,
		private formDataResourceService: FormDataResourceService,
	) { }

	resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.formDataResourceService.getFormDataUsingGET(id);
    }
}