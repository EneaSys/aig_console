import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseSplashScreenService } from "@fuse/services/splash-screen.service";
import { AuthService } from "auth/auth.service";
import { GenericComponent } from "../../../../generic-component/generic-component";
import { AigGenericComponentService } from "../../../../generic-component/generic-component.service";
import { AigSelectAuthDialogComponent } from "../select-auth-dialog/select-auth-dialog.component";
import { AigSelectContextDialogComponent } from "../select-context-dialog/select-context-dialog.component";

@Component({
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss']
})
export class AigWelcomePageComponent extends GenericComponent {
	public loggedUser: boolean;
	public name: string;
	public pageLoaded: boolean;

	constructor(
		public authService: AuthService,
		private _fuseConfigService: FuseConfigService,
		public fuseSplashScreenService: FuseSplashScreenService,
		private dialog: MatDialog,
		aigGenericComponentService: AigGenericComponentService,
	) {
		super(aigGenericComponentService);

		// Configure the layout
		this._fuseConfigService.config = {
			layout: {
				navbar: {
					hidden: true
				},
				toolbar: {
					hidden: true
				},
				footer: {
					hidden: true
				},
				sidepanel: {
					hidden: true
				}
			}
		};
	}

	loadPage() {
		this.checkConnectedUser();
	}

	reloadPage() {
		console.log("reload page");
		this.pageLoaded = false;
		this.checkConnectedUser();
	}

	async checkConnectedUser() {
		this.loggedUser = false;
		if(await this.authService.isAuthenticated()) {
			let user: any = await this.authService.getUser();
			this.name = user.given_name + " " + user.family_name;
			this.loggedUser = true;
		}
		this.pageLoaded = true;
	}

	login() {
		this.dialog.open(AigSelectAuthDialogComponent, { data: {  } });
	}

	selectContext() {
		this.dialog.open(AigSelectContextDialogComponent, { data: {  } });
	}
	
	logout() {
		this.authService.logout(location.href);
	}

}
