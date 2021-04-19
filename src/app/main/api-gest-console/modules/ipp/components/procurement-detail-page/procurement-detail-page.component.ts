import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { ProcurementDTO, ProcurementLotDTO, ProcurementLotResourceService, ProcurementResourceService } from "aig-italianlegislation";
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
    private procurementLotResourceService: ProcurementLotResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  procurement: ProcurementDTO;

  procurementLotDC: string[];
	procurementLotDTOs: ProcurementLotDTO[];
	procurementLotError: any;

  

  loadPage() {
    this.procurement = this.route.snapshot.data.procurement;
    this.procurementLotDC = ["cig","description","buttons"];
    this.loadProcurementLot();
    console.log(this.procurement)
}

private async loadProcurementLot() {
  let filter = {
    procurementIdEquals: this.procurement.id
  };
  this.procurementLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(filter).toPromise();
}


async reloadPage() {
  this.procurement = await this.procurementResourceService.getProcurementUsingGET(this.procurement.id).toPromise();
  this.loadProcurementLot()
}



  editProcurement(procurement: ProcurementDTO) {
    this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: { procurement: procurement } });
  }

  async deleteProcurement(procurement: ProcurementDTO) {
    this._fuseProgressBarService.show();

    try {
      await this.procurementResourceService.deleteProcurementUsingDELETE(procurement.id).toPromise();

      this._snackBar.open(`Procurement: '${procurement.id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'procurement']);
    } catch (e) {
      this._snackBar.open(`Error during deleting procurement: '${procurement.id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }

  
}