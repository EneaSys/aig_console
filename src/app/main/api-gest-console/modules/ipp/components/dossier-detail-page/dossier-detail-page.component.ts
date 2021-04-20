import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { DossierDTO, DossierResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigDossierNewUpdateDialogComponent } from "../dossier-new-update-dialog/dossier-new-update-dialog.component";


@Component({
  selector: 'aig-dossier-detail-page',
  templateUrl: './dossier-detail-page.component.html',
  styleUrls: ['./dossier-detail-page.component.scss']
})
export class AigDossierDetailPageComponent extends GenericComponent {
  constructor(
    private dossierResourceService: DossierResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  dossierDTO: DossierDTO;

  dossierConfig = {
    details: true,
    removeDossier: null,
  }

  loadPage() {
    this.dossierDTO = this.route.snapshot.data.dossier;

    this.dossierConfig.removeDossier = this.dossierDTO;
  }

  async reloadPage() {
    this.dossierDTO = await this.dossierResourceService.getDossierUsingGET(this.dossierDTO.id).toPromise();
  }

  editDossier(dossierDTO: DossierDTO) {
    this.dialog.open(AigDossierNewUpdateDialogComponent, { data: { dossier: dossierDTO } });
  }

  async deleteDossier(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.dossierResourceService.deleteDossierUsingDELETE(id).toPromise();

      this._snackBar.open(`Dossier: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'dossier']);
    } catch (e) {
      this._snackBar.open(`Error during deleting dossier: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}