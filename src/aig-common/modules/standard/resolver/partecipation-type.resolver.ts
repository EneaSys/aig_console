import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpPartecipationTypeDTO, IlPpPartecipationTypeResourceService} from 'aig-standard';

@Injectable()
export class PartecipationTypeResolver implements Resolve<Observable<IlPpPartecipationTypeDTO>> {
  constructor(
    private partecipationTypeResourceService: IlPpPartecipationTypeResourceService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    var id: number = +route.paramMap.get('id');
    return this.partecipationTypeResourceService.getIlPpPartecipationTypeUsingGET(id);
  }
}