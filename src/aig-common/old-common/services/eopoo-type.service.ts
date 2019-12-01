import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from './request-util';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class EopooTypeService {
  public resourceUrl = SERVER_API_URL + 'api/eopoo-types';

  constructor(protected http: HttpClient) {}

  create(eopooType: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl, eopooType, { observe: 'response' });
  }

  update(eopooType: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl, eopooType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
