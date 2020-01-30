import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CpvService } from './cpv.service';

type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable()
export class CpvResolver implements Resolve<Observable<EntityArrayResponseType>> {
  constructor(
    private cpvService: CpvService
  ) {}

  resolve() {
    return this.cpvService.query();
  }
}