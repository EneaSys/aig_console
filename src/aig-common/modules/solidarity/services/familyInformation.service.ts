import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AigFamilyInformationService {
    constructor(
        private http: HttpClient,
    ) { }

    hypersicApiUrl: string = "http://213.82.217.117:3000/";

    getFamily(taxId: string): Observable<any[]> {
        return this.http.get<any[]>(this.hypersicApiUrl + 'get-family?cf=' + taxId.toUpperCase());
    }
}