import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CpvDTO, CpvResourceService } from 'aig-standard';

@Injectable()
export class CpvResolver implements Resolve<Observable<CpvDTO>> {
  constructor(
    private cpvResourceService: CpvResourceService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    var id: number = +route.paramMap.get('id');
    return this.cpvResourceService.getCpvUsingGET(id);
  }
}