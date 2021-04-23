import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { DesignatedCompanyDTO, DesignatedCompanyResourceService, DossierDTO, DossierResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigDesignatedCompanyNewUpdateDialogComponent } from "../designated-company-new-update-dialog/designated-company-new-update-dialog.component";
import { AigDossierNewUpdateDialogComponent } from "../dossier-new-update-dialog/dossier-new-update-dialog.component";


@Component({
  selector: 'aig-designated-company-detail-page',
  templateUrl: './designated-company-detail-page.component.html',
  styleUrls: ['./designated-company-detail-page.component.scss']
})
export class AigDesignatedCompanyDetailPageComponent extends GenericComponent {
  constructor(
    private designatedCompanyResourceService: DesignatedCompanyResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  designatedCompanyDTO: DesignatedCompanyDTO;

  designatedCompanyConfig = {
    details: true,
    removeDesignatedCompany: null,
  }

  loadPage() {
    this.designatedCompanyDTO = this.route.snapshot.data.designatedCompany;

    this.designatedCompanyConfig.removeDesignatedCompany = this.designatedCompanyDTO;
  }

  async reloadPage() {
    this.designatedCompanyDTO = await this.designatedCompanyResourceService.getDesignatedCompanyUsingGET(this.designatedCompanyDTO.id).toPromise();
  }

  editDesignatedCompany(designatedCompanyDTO: DesignatedCompanyDTO) {
    this.dialog.open(AigDesignatedCompanyNewUpdateDialogComponent, { data: { designatedCompany: designatedCompanyDTO } });
  }

  async deleteDesignatedCompany (id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.designatedCompanyResourceService.deleteDesignatedCompanyUsingDELETE(id).toPromise();

      this._snackBar.open(`Designated Company: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'designated-company']);
    } catch (e) {
      this._snackBar.open(`Error during deleting designated company: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}