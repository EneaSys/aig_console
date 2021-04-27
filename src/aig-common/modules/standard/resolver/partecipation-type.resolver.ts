import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PartecipationTypeDTO, PartecipationTypeResourceService} from 'aig-standard';

@Injectable()
export class PartecipationTypeResolver implements Resolve<Observable<PartecipationTypeDTO>> {
  constructor(
    private partecipationTypeResourceService: PartecipationTypeResourceService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    var id: number = +route.paramMap.get('id');
    return this.partecipationTypeResourceService.getPartecipationTypeUsingGET(id);
  }
}