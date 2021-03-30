import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContextModuleNewUpdateModalComponent } from '../context-module-new-update-modal/context-module-new-update-modal.component';
import { ContextModuleDTO, ContextModuleResourceService } from 'aig-management';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector: 'aig-context-module-detail-page',
    templateUrl: './context-module-detail-page.component.html',
    styleUrls: ['./context-module-detail-page.component.scss']
})
export class AigContextModuleDetailPageComponent extends GenericComponent {
   
    constructor(
        private contextModuleResourceService: ContextModuleResourceService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
        ) { super(aigGenericComponentService) }


    contextModuleDTO: ContextModuleDTO

    loadPage() {
        this.contextModuleDTO = this.route.snapshot.data.contextModule;
    }

    async reloadPage() {
        this.contextModuleDTO = await this.contextModuleResourceService.getContextModuleUsingGET(this.contextModuleDTO.id).toPromise();
    }

    async deleteContextModule(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.contextModuleResourceService.deleteContextModuleUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Context Module: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'context-module']);
        } catch (e) {
            this._snackBar.open(`Error during deleting context Module: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editContextModule(contextModuleDTO: ContextModuleDTO) {

        this.dialog.open(AigContextModuleNewUpdateModalComponent, { data: { contextModule: contextModuleDTO }});
    }

}