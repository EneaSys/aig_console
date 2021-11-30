import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
	providedIn: 'root'
})
export class AigMerchantService {

	constructor(
		private http: HttpClient,

	) { }

	postMerchant(merchant: any) {
		return this.http.post<any[]>(SERVER_API_URL + "pos/merchant", merchant);
	}

	putMerchant(merchant: any) {
		return this.http.put<any[]>(SERVER_API_URL + "pos/merchant", merchant);
	}

	getMerchants(filters: any) {
		let options = {
			params: this.prepareParams(filters)
		};
		
		return this.http.get<any[]>(SERVER_API_URL + "pos/merchant", options);
	}

	deleteMerchant(id: number) {
		return this.http.delete(SERVER_API_URL + "pos/merchant/" + id);
	}

	private prepareParams(filters: any) {
		let params = new HttpParams();
		for (let [key, value] of Object.entries(filters)) {
			if(value == null) {
				continue;
			}
			let param = null;
			if((typeof value) == 'string' || (typeof value) == 'number') {
				param = String(value);
			}
			params = params.append(key, param);
		}
		return params;
	}
}