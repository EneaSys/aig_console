import { Component } from '@angular/core';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EopooDTO, EopooResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { PartecipationDTO, PartecipationModalityDTO, PartecipationModalityResourceService, PartecipationStatusDTO, PartecipationStatusResourceService } from 'aig-italianlegislation';
import { AigPartecipationNewUpdateDialogComponent } from '../partecipation-new-update-dialog/partecipation-new-update-dialog.component';
import { IlPpPartecipationTypeDTO, IlPpPartecipationTypeResourceService } from 'aig-standard';

@Component({
    templateUrl: './consorzio-manager-page.component.html',
    styleUrls: ['./consorzio-manager-page.component.scss']
})
export class AigConsorzioManagerPageComponent extends GenericComponent {
    constructor(
        private consorzioResourceService: EopooResourceService,
        private partecipationModalityResourceService: PartecipationModalityResourceService,
        private partecipationStatusResourceService: PartecipationStatusResourceService,
        private partecipationTypeResourceService: IlPpPartecipationTypeResourceService,
        private eventService :EventService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    companyEopooDTOs: EopooDTO[] = [];

    selectedCompanyEopoo: EopooDTO;
    partecipationDTO: PartecipationDTO;

    loadingPage: boolean = true;
    errorInLoading: any;

    modality: PartecipationModalityDTO;
    status: PartecipationStatusDTO;
    type: IlPpPartecipationTypeDTO;

    async loadPage() {
        try {
			// DA CANCELLARE QUANDO METTO IL MY EOPOO
			{
				let eopooStatic: EopooDTO = await this.consorzioResourceService.getEopooUsingGET(1).toPromise();
				this.companyEopooDTOs.push(eopooStatic);
			}

			//this.consorzioDTOs = await this.consorzioResourceService.getAllEopoosUsingGET(this.consorzioFilters).toPromise();
            if(this.companyEopooDTOs.length == 0){
                this._snackBar.open("Nessun azienda trovata!", null, {duration: 5000,});
            }
            if (this.companyEopooDTOs.length > 0) {
                this.setCompany(this.companyEopooDTOs[0]);
            } else {
                throw new Error("Nessun azienda associata");
            }

            this.modality = await this.partecipationModalityResourceService.getPartecipationModalityUsingGET(1).toPromise();
            this.status = await this.partecipationStatusResourceService.getPartecipationStatusUsingGET(5).toPromise();
            this.type = await this.partecipationTypeResourceService.getIlPpPartecipationTypeUsingGET(1).toPromise();

        } catch (e) {
            this.errorInLoading = e;
        }
        this.loadingPage = false;
    }

    partecipationFn = (e: any) => {
        this.dialog.open(AigPartecipationNewUpdateDialogComponent, { 
            data: { 
                procurementLot: e, 
                proposerEopoo: this.selectedCompanyEopoo,
                modality: this.modality,
                type: this.type,
                status: this.status,
            }
        });
    }

    setCompany(companyEopoo: EopooDTO) {
        this.selectedCompanyEopoo = companyEopoo;
        setTimeout(()=>{ this.eventService.reloadCurrentPage(); }, 1);
    }
}