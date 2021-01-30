import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AigContextRepositoryService } from 'aig-common/context-browser-repository/context-browser-repository.service';
import { IContext } from 'aig-common/context-browser-repository/Context.model';
import { UserPermissionMemoryResourceService, WsUserContextService } from 'api-gest';
import { AigModuleNavigationService } from '../../navigation/navigation.service';

@Component({
    templateUrl: './select-context-dialog.component.html',
    styleUrls: ['./select-context-dialog.component.scss']
})
export class AigSelectContextDialogComponent implements OnInit {
	displayedColumns: string[] = ['name', 'selectContext'];
	dataSource: any[];
	error: any;
	loading: boolean = true;
	
	constructor(
		private aigContextRepositoryService: AigContextRepositoryService,
		private userPermissionMemoryResourceService: UserPermissionMemoryResourceService,
		private aigModuleNavigationService: AigModuleNavigationService,
		private router: Router,
		private wsUserContextService: WsUserContextService,
        public matDialogRef: MatDialogRef<AigSelectContextDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

	ngOnInit(): void {
		this.loadContexts();
	}

	async loadContexts() {
		try{
			this.dataSource = await this.wsUserContextService.getMyContexts().toPromise();
			this.loading = false;
		} catch(e) {
			this.error = e;
		}
	}
	
	async setDefaultContextAndGoToHome(context: IContext) {
		this.loading = true;

		await this.aigContextRepositoryService.setDefaultContext(context);
		this.router.navigate(['/home-page']);

		await this.userPermissionMemoryResourceService.cleanUserPermission1().toPromise();
		this.aigModuleNavigationService.reloadNavigation();
		
		this.matDialogRef.close();
	}
}
