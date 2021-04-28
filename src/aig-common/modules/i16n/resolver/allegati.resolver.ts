import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AllegatiDTO, AllegatiResourceService } from 'aig-italianlegislation';

@Injectable()
export class AllegatiResolver implements Resolve<Observable<AllegatiDTO>> {
    constructor(private allegatiResourceService: AllegatiResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.allegatiResourceService.getAllegatiUsingGET(id);
    }
}