import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AigFamilyInformationService {
    constructor(
        private http: HttpClient,
    ) { }

    hypersicApiUrl: string = "https://smlc-getfamily.eneasys.com/";

    getFamily(taxId: string): Observable<any[]> {
        return this.http.get<any[]>(this.hypersicApiUrl + 'get-family?cf=' + taxId.toUpperCase());
    }
}