import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import {  PartecipationDTO, PartecipationResourceService, PreparationDTO, PreparationResourceService, PreparationStatusDTO, PreparationStatusResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";
import { AigPreparationNewUpdateDialogComponent } from "../preparation-new-update-dialog/preparation-new-update-dialog.component";
import { AigPreparationStatusNewUpdateDialogComponent } from "../preparation-status-new-update-dialog/preparation-status-new-update-dialog.component";


@Component({
  selector: 'aig-preparation-status-detail-page',
  templateUrl: './preparation-status-detail-page.component.html',
  styleUrls: ['./preparation-status-detail-page.component.scss']
})
export class AigPreparationStatusDetailPageComponent extends GenericComponent {
  constructor(
    private preparationStatusResourceService: PreparationStatusResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  preparationStatusDTO: PreparationStatusDTO;

  preparationStatusConfig = {
    details: true,
    removePreparationStatus: null,
  }

  loadPage() {
    this.preparationStatusDTO = this.route.snapshot.data.preparationStatus;

    this.preparationStatusConfig.removePreparationStatus = this.preparationStatusDTO;
  }

  async reloadPage() {
    this.preparationStatusDTO = await this.preparationStatusResourceService.getPreparationStatusUsingGET(this.preparationStatusDTO.id).toPromise();
  }

  editPreparationStatus(preparationStatusDTO: PreparationStatusDTO) {
    this.dialog.open(AigPreparationStatusNewUpdateDialogComponent, { data: { preparationStatus: preparationStatusDTO } });
  }

  async deletePreparationStatus(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.preparationStatusResourceService.deletePreparationStatusUsingDELETE(id).toPromise();

      this._snackBar.open(`PreparationStatus: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'preparation-status']);
    } catch (e) {
      this._snackBar.open(`Error during deleting preparation status: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}