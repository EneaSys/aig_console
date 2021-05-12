import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AddressDTO, AddressResourceService } from 'aig-generic';

@Injectable()
export class AddressResolver implements Resolve<Observable<AddressDTO>> {
    constructor(private addressResourceService: AddressResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id: number = +route.paramMap.get('id');
        return this.addressResourceService.getAddressUsingGET(id);
    }
}