import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { ProcurementDTO, ProcurementLotDTO, ProcurementLotResourceService, ProcurementResourceService } from "aig-italianlegislation";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigIppGenericComponent } from "../ipp-generic-component";
import { AigProcurementLotNewUpdateDialogComponent } from "../procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component";
import { AigProcurementNewUpdateDialogComponent } from "../procurement-new-update-dialog/procurement-new-update-dialog.component";


@Component({
  selector: 'aig-procurement-detail-page',
  templateUrl: './procurement-detail-page.component.html',
  styleUrls: ['./procurement-detail-page.component.scss']
})
export class AigProcurementDetailPageComponent extends AigIppGenericComponent {
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

  procurementDTO: ProcurementDTO;

  loadPage() {
    this.procurementDTO = this.route.snapshot.data.procurement;
    this.loadOther();
  }

  async reloadPage() {
    this.procurementDTO = await this.procurementResourceService.getProcurementUsingGET(this.procurementDTO.id).toPromise();
    this.loadOther();
  }

  async loadOther() {
    this.loadProcurementLot();
  }

  editProcurement(procurementDTO: ProcurementDTO) {
    this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: { procurement: procurementDTO } });
  }

  async deleteProcurement(procurementDTO: ProcurementDTO) {
    this._fuseProgressBarService.show();

    try {
      await this.procurementResourceService.deleteProcurementUsingDELETE(procurementDTO.id).toPromise();

      this._snackBar.open(`Procurement: '${procurementDTO.id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'procurement']);
    } catch (e) {
      this._snackBar.open(`Error during deleting procurement: '${procurementDTO.id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }





  
  procurementLotDC: string[] = ['id', 'cig', 'description', 'amount', 'type', 'category', 'awardCriterion', 'offerExpiryDate', 'buttons'];
  procurementLotDTOs: ProcurementLotDTO[];
  procurementLotError: any;
  async loadProcurementLot() {
    let filters = {
      procurementIdEquals: this.procurementDTO.id
    };
    try {
      this.procurementLotDTOs = await this.procurementLotResourceService.getAllProcurementLotsUsingGET(filters).toPromise();
    } catch (e) {
      this.procurementLotError = e;
    }
  }

  newProcurementLot(procurementDTO: ProcurementDTO): void {
    this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurement: procurementDTO } });
  }

}