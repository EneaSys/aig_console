import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AigProcurementLotNewUpdateFormComponent } from "aig-common/modules/ipp/components/procurement-lot-new-update-form/procurement-lot-new-update-form.component";


import {  ProcurementLotDTO, ProcurementLotResourceService,  } from "aig-italian-public-procurement";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigProcurementLotNewUpdateDialogComponent } from "../procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component";


@Component({
  selector: 'aig-procurement-lot-detail-page',
  templateUrl: './procurement-lot-detail-page.component.html',
  styleUrls: ['./procurement-lot-detail-page.component.scss']
})
export class AigProcurementLotDetailPageComponent extends GenericComponent {
  constructor(
    private procurementLotResourceService: ProcurementLotResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  procurementLotDTO: ProcurementLotDTO;

    procurementLotConfig = {
    details: true,
    removeProcurementLot: null,
  }

  loadPage() {
    this.procurementLotDTO = this.route.snapshot.data.procurementLot;

    this.procurementLotConfig.removeProcurementLot = this.procurementLotDTO;
  }

  async reloadPage() {
    this.procurementLotDTO = await this.procurementLotResourceService.getProcurementLotUsingGET(this.procurementLotDTO.id).toPromise();
  }

  editProcurementLot(procurementLotDTO: ProcurementLotDTO) {
    this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: procurementLotDTO } });
  }

  async deleteProcurementLot(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.procurementLotResourceService.deleteProcurementLotUsingDELETE(id).toPromise();

      this._snackBar.open(`Procurement Lot: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'procurement-lot']);
    } catch (e) {
      this._snackBar.open(`Error during deleting procurement lot: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}