import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AwardCriterionDTO, AwardCriterionResourceService} from 'aig-standard';

@Injectable()
export class AwardCriterionResolver implements Resolve<Observable<AwardCriterionDTO>> {
  constructor(
    private awardCriterionResourceService: AwardCriterionResourceService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    var id: number = +route.paramMap.get('id');
    return this.awardCriterionResourceService.getAwardCriterionUsingGET(id);
  }
}