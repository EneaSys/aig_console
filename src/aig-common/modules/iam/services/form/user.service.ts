import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
	providedIn: 'root'
})
export class AigUserService {
	constructor(
		private http: HttpClient,
	) {}


	reloadPermissions(userCode: string) {
		return this.http.get(SERVER_API_URL+'api/rest/users/'+userCode+'/code-permissions');
	}
}