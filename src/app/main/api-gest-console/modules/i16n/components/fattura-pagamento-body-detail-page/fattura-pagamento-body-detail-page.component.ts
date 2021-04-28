import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { MatSnackBar } from '@angular/material';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { DettaglioPagamentoDTO, FatturaElettronicaBodyDTO, FatturaElettronicaBodyResourceService } from 'aig-italianlegislation';
import { AigDettaglioPagamentoNewUpdateDialogComponent } from '../dettaglio-pagamento-new-update-dialog/dettaglio-pagamento-new-update-dialog.component';
import { AigFatturaElettronicaBodyNewUpdateFormComponent } from 'aig-common/modules/i16n/components/fattura-elettronica-body-new-update-form/fattura-elettronica-body-new-update-form.component';
import { AigFatturaElettronicaNewUpdateDialogComponent } from '../fattura-elettronica-new-update-dialog/fattura-elettronica-new-update-dialog.component';

@Component({
    templateUrl: './fattura-pagamento-body-detail-page.component.html',
    styleUrls: ['./fattura-pagamento-body-detail-page.component.scss']
})
export class AigFatturaElettronicaBodyDetailPageComponent extends GenericComponent {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
        private _fuseProgressBarService: FuseProgressBarService,
        private fatturaElettronicaBodyResourceService: FatturaElettronicaBodyResourceService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    fatturaElettronicaBody: FatturaElettronicaBodyDTO;

    async loadComponent() {
        if (this.firstLoad) {
            this.fatturaElettronicaBody = this.route.snapshot.data.fatturaElettronicaBody;
        } else {
            this.fatturaElettronicaBody = await this.fatturaElettronicaBodyResourceService.getFatturaElettronicaBodyUsingGET(this.fatturaElettronicaBody.id).toPromise();
        }
    }

    async deleteFatturaElettronica(id: number) {
        this._fuseProgressBarService.show();

        try {
            await this.fatturaElettronicaBodyResourceService.deleteFatturaElettronicaBodyUsingDELETE(id).toPromise();

            this._snackBar.open(`Fattura Elettronica: '${id}' deleted.`, null, { duration: 2000, });

            this.router.navigate(['/i16n', 'fattura-elettronica-body']);
        } catch (e) {
            this._snackBar.open(`Error during deleting fattura elettronica: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }

    editFatturaElettronica(fatturaElettronicaBody: FatturaElettronicaBodyDTO) {
        this.dialog.open(AigFatturaElettronicaNewUpdateDialogComponent, { data: { fatturaElettronicaBody: fatturaElettronicaBody } });
    }

}