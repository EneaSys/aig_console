import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CityService } from './city.service';

type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable()
export class CityResolver implements Resolve<Observable<EntityArrayResponseType>> {
  constructor(
    private cityService: CityService
  ) {}

  resolve() {
    return this.cityService.query();
  }
}