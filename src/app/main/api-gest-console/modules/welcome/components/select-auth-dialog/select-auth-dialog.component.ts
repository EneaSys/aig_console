import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'auth/auth.service';

@Component({
    templateUrl: './select-auth-dialog.component.html',
    styleUrls: ['./select-auth-dialog.component.scss']
})
export class AigSelectAuthDialogComponent implements OnInit {
	displayedColumns: string[] = ['name', 'buttons'];
	dataSource: any[];
	error: any;
	loading: boolean = true;
	
	constructor(
		public authService: AuthService,
        public matDialogRef: MatDialogRef<AigSelectAuthDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

	ngOnInit(): void {
		this.loadAuth();
	}

	async loadAuth() {
		try{
			this.dataSource = [
				{
					name: 'Okta',
					idpIdentifier: 'apigest-okta',
				},
				{
					name: 'Espami',
					idpIdentifier: 'ya75g8a',
				},
			];
			this.loading = false;
		} catch(e) {
			this.error = e;
		}
	}
	
	async goToAuth(auth: any) {
		this.loading = true;
		//TODO login tramite servizio
		this.authService.loginRedirect(auth.idpIdentifier);
	}

}
