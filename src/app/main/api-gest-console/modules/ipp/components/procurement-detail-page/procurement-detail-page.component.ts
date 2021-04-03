import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";

import { AigProcurementNewUpdateFormComponent } from "aig-common/modules/ipp/components/procurement-new-update-form/procurement-new-update-form.component";
import { ProcurementDTO, ProcurementResourceService } from "aig-italian-public-procurement";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigProcurementNewUpdateDialogComponent } from "../procurement-new-update-dialog/procurement-new-update-dialog.component";


@Component({
  selector: 'aig-procurement-detail-page',
  templateUrl: './procurement-detail-page.component.html',
  styleUrls: ['./procurement-detail-page.component.scss']
})
export class AigProcurementDetailPageComponent extends GenericComponent {
  constructor(
    private procurementResourceService: ProcurementResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  procurementDTO: ProcurementDTO;

    procurementConfig = {
    details: true,
    removeProcurement: null,
  }

  loadPage() {
    this.procurementDTO = this.route.snapshot.data.procurement;

    this.procurementConfig.removeProcurement = this.procurementDTO;
  }

  async reloadPage() {
    this.procurementDTO = await this.procurementResourceService.getProcurementUsingGET(this.procurementDTO.id).toPromise();
  }

  editProcurement(procurementDTO: ProcurementDTO) {
    this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: { procurement: procurementDTO } });
  }

  async deleteProcurement(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.procurementResourceService.deleteProcurementUsingDELETE(id).toPromise();

      this._snackBar.open(`Procurement: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'procurement']);
    } catch (e) {
      this._snackBar.open(`Error during deleting procurement: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}