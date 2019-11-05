import { EopooTypeService } from './eopoo-type.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApolloDocumentLineService } from './apollo-document-line.service';

type EntityResponse = HttpResponse<any>;

@Injectable()
export class ApolloDocumentLineResolver implements Resolve<Observable<EntityResponse>> {
  constructor(
    private apolloDocumentLineService: ApolloDocumentLineService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
      var idApolloDocument: number = +route.paramMap.get('id');
      
      var requestFilter : any = {
        'apolloDocumentId.equals': idApolloDocument,
      }
      
      return this.apolloDocumentLineService.query(requestFilter);
  }
}