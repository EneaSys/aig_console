import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import {  PartecipationDTO, PartecipationResourceService, PreparationDTO, PreparationResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";
import { AigPreparationNewUpdateDialogComponent } from "../preparation-new-update-dialog/preparation-new-update-dialog.component";


@Component({
  selector: 'aig-preparation-detail-page',
  templateUrl: './preparation-detail-page.component.html',
  styleUrls: ['./preparation-detail-page.component.scss']
})
export class AigPreparationDetailPageComponent extends GenericComponent {
  constructor(
    private preparationResourceService: PreparationResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  preparationDTO: PreparationDTO;

  preparationConfig = {
    details: true,
    removePreparation: null,
  }

  loadPage() {
    this.preparationDTO = this.route.snapshot.data.preparation;

    this.preparationConfig.removePreparation = this.preparationDTO;
  }

  async reloadPage() {
    this.preparationDTO = await this.preparationResourceService.getPreparationUsingGET(this.preparationDTO.id).toPromise();
  }

  editPreparation(preparationDTO: PreparationDTO) {
    this.dialog.open(AigPreparationNewUpdateDialogComponent, { data: { preparation: preparationDTO } });
  }

  async deletePreparation(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.preparationResourceService.deletePreparationUsingDELETE(id).toPromise();

      this._snackBar.open(`Preparation: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'preparation']);
    } catch (e) {
      this._snackBar.open(`Error during deleting preparation: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}