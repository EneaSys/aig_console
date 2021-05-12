import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IlPpProcurementLotAwardCriterionDTO,IlPpProcurementLotAwardCriterionResourceService} from 'aig-standard';

@Injectable()
export class AwardCriterionResolver implements Resolve<Observable< IlPpProcurementLotAwardCriterionDTO>> {
  constructor(
    private awardCriterionResourceService:  IlPpProcurementLotAwardCriterionResourceService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    var id: number = +route.paramMap.get('id');
    return this.awardCriterionResourceService.getIlPpProcurementLotAwardCriterionUsingGET(id);
  }
}