import { EopooTypeService } from './eopoo-type.service';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable()
export class EopooTypeResolver implements Resolve<Observable<EntityArrayResponseType>> {
  constructor(
    private eopooTypeService: EopooTypeService
  ) {}

  resolve() {
    return this.eopooTypeService.query();
  }
}