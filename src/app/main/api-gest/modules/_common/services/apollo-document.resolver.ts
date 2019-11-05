import { EopooTypeService } from './eopoo-type.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApolloDocumentService } from './apollo-document.service';

type EntityResponse = HttpResponse<any>;

@Injectable()
export class ApolloDocumentResolver implements Resolve<Observable<EntityResponse>> {
  constructor(
    private apolloDocumentService: ApolloDocumentService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
      var idApolloDocument: number = +route.paramMap.get('id');
      return this.apolloDocumentService.find(idApolloDocument);
  }
}