import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { PigesAuthService } from './piges-auth.service';
import { STORAGE_KEY } from './pigest.export';

@Component({
	templateUrl: './piges-auth-callback.component.html',

})
export class PigesAuthCallbackComponent implements OnInit {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private localStorage: LocalStorageService,
		private pigesAuthService: PigesAuthService,
	) { }

	ngOnInit(): void {
		this.load();
	}

	async load() {
		let fragmentMap = { };
		this.activatedRoute.snapshot.fragment.split("&").forEach((fragment: string) => {
			let fragmentVals = fragment.split("=");
			fragmentMap[fragmentVals[0]] = fragmentVals[1];
		});
		this.localStorage.store(STORAGE_KEY, fragmentMap);

		await this.pigesAuthService.getUser();

		this.router.navigateByUrl('/welcome-page');
	}
	
}
