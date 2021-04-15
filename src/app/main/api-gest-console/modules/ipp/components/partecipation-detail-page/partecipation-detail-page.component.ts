import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import {  PartecipationDTO, PartecipationResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";


@Component({
  selector: 'aig-partecipation-detail-page',
  templateUrl: './partecipation-detail-page.component.html',
  styleUrls: ['./partecipation-detail-page.component.scss']
})
export class AigPartecipationDetailPageComponent extends GenericComponent {
  constructor(
    private partecipationResourceService: PartecipationResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  partecipationDTO: PartecipationDTO;

  partecipationConfig = {
    details: true,
    removePartecipation: null,
  }

  loadPage() {
    this.partecipationDTO = this.route.snapshot.data.partecipation;

    this.partecipationConfig.removePartecipation = this.partecipationDTO;
  }

  async reloadPage() {
    this.partecipationDTO = await this.partecipationResourceService.getPartecipationUsingGET(this.partecipationDTO.id).toPromise();
  }

  editPartecipation(partecipationDTO: PartecipationDTO) {
    this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { partecipation: partecipationDTO } });
  }

  async deletePartecipation(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.partecipationResourceService.deletePartecipationUsingDELETE(id).toPromise();

      this._snackBar.open(`Partecipation: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'partecipation']);
    } catch (e) {
      this._snackBar.open(`Error during deleting partecipation: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}