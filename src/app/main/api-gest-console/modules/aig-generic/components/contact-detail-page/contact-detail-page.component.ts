import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ContactDTO, ContactResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContactNewUpdateDialogComponent } from '../contact-new-update-dialog/contact-new-update-dialog.component';

@Component({
    templateUrl: './contact-detail-page.component.html',
    styleUrls: ['./contact-detail-page.component.scss']
})
export class AigContactDetailPageComponent extends GenericComponent {
    constructor(
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private contactResourceService: ContactResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    contactDTO: ContactDTO;

    async loadComponent() {
        if(this.firstLoad) {
            this.contactDTO = this.route.snapshot.data.contact;
        } else {
            this.contactDTO = await this.contactResourceService.getContactUsingGET(this.contactDTO.id).toPromise();
        }
    }

    editContact(contactDTO: ContactDTO) {
        this.dialog.open(AigContactNewUpdateDialogComponent, { data: { contact: contactDTO } });
    }

    async deleteContact(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.contactResourceService.deleteContactUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Contact: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/g5c', 'contact']);
        } catch (e) {
            this._snackBar.open(`Error during deleting contact: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
      }
}