import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactDTO, ContactResourceService } from 'aig-generic';

@Injectable()
export class ContactResolver implements Resolve<Observable<ContactDTO>> {
    constructor(private contactResourceService: ContactResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.contactResourceService.getContactUsingGET(id);
    }
}