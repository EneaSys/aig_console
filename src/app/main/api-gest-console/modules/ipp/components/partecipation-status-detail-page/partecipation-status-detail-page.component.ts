import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { PartecipationStatusDTO, PartecipationStatusResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationStatusNewUpdateDialogComponent } from "../partecipation-status-new-update-dialog/partecipation-status-new-update-dialog.component";


@Component({
  selector: 'aig-partecipation-status-detail-page',
  templateUrl: './partecipation-status-detail-page.component.html',
  styleUrls: ['./partecipation-status-detail-page.component.scss']
})
export class AigPartecipationStatusDetailPageComponent extends GenericComponent {
  constructor(
    private partecipationStatusResourceService: PartecipationStatusResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  partecipationStatusDTO: PartecipationStatusDTO;


  loadPage() {
    this.partecipationStatusDTO = this.route.snapshot.data.partecipationStatus;
  }

  async reloadPage() {
    this.partecipationStatusDTO = await this.partecipationStatusResourceService.getPartecipationStatusUsingGET(this.partecipationStatusDTO.id).toPromise();
  }

  editPartecipationStatus(partecipationStatusDTO: PartecipationStatusDTO) {
    this.dialog.open(AigPartecipationStatusNewUpdateDialogComponent, { data: { partecipationStatus: partecipationStatusDTO } });
  }

  async deletePartecipationStatus(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.partecipationStatusResourceService.deletePartecipationStatusUsingDELETE(id).toPromise();

      this._snackBar.open(`PartecipationStatus: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'partecipation-status']);
    } catch (e) {
      this._snackBar.open(`Error during deleting partecipation status: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}