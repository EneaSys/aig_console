import { Component } from '@angular/core';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EopooResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { PartecipationDTO, PartecipationModalityDTO, PartecipationModalityResourceService, PartecipationStatusDTO, PartecipationStatusResourceService } from 'aig-italianlegislation';
import { AigPartecipationNewUpdateDialogComponent } from '../partecipation-new-update-dialog/partecipation-new-update-dialog.component';
import { IlPpPartecipationTypeDTO, IlPpPartecipationTypeResourceService } from 'aig-standard';
import { ContextUserEopooDTO, EopooDTO, UserResourceService } from 'aig-entity-manager';

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
		private userResourceService: UserResourceService,
        private eventService :EventService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }


    contextUserEopooDTOs: ContextUserEopooDTO[] = [];

    selectedCompanyEopoo: EopooDTO;
    partecipationDTO: PartecipationDTO;

    loadingPage: boolean = true;
    errorInLoading: any;

    modality: PartecipationModalityDTO;
    status: PartecipationStatusDTO;
    type: IlPpPartecipationTypeDTO;

    async loadPage() {
        try {
			this.contextUserEopooDTOs = await this.userResourceService.getMyEopooUsingGET().toPromise();

            if(this.contextUserEopooDTOs.length == 0){
                this._snackBar.open("Nessun azienda trovata!", null, {duration: 5000,});
            }
            if (this.contextUserEopooDTOs.length > 0) {
                this.setCompany(this.contextUserEopooDTOs[0].eopooDTO);
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