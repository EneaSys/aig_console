import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { PartecipationDTO, PartecipationResourceService, ProcurementDTO, ProcurementLotDTO, ProcurementLotResourceService } from "aig-italianlegislation";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigIppGenericComponent } from "../ipp-generic-component";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";
import { AigProcurementLotNewUpdateDialogComponent } from "../procurement-lot-new-update-dialog/procurement-lot-new-update-dialog.component";
import { AigProcurementNewUpdateDialogComponent } from "../procurement-new-update-dialog/procurement-new-update-dialog.component";

@Component({
  selector: 'aig-procurement-lot-detail-page',
  templateUrl: './procurement-lot-detail-page.component.html',
  styleUrls: ['./procurement-lot-detail-page.component.scss']
})
export class AigProcurementLotDetailPageComponent extends AigIppGenericComponent {
  constructor(
    private procurementLotResourceService: ProcurementLotResourceService,
    private partecipationResourceService: PartecipationResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  procurementLotDTO: ProcurementLotDTO;

  loadPage() {
    this.procurementLotDTO = this.route.snapshot.data.procurementLot;
    this.loadOther();
  }

  async reloadPage() {
    this.procurementLotDTO = await this.procurementLotResourceService.getProcurementLotUsingGET(this.procurementLotDTO.id).toPromise();
    this.loadOther();
  }

  async loadOther() {
    this.loadPartecipation();
  }

  editProcurementLot(procurementLot: ProcurementLotDTO) {
    this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: procurementLot } });
  }

  async deleteProcurementLot(procurementLotDTO: ProcurementLotDTO) {
    this._fuseProgressBarService.show();

    try {
      await this.procurementLotResourceService.deleteProcurementLotUsingDELETE(procurementLotDTO.id).toPromise();

      this._snackBar.open(`Procurement lot: '${procurementLotDTO.id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'procurement-lot']);
    } catch (e) {
      this._snackBar.open(`Error during deleting procurement lot: '${procurementLotDTO.id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }



  editProcurement(procurementDTO: ProcurementDTO) {
    this.dialog.open(AigProcurementNewUpdateDialogComponent, { data: { procurement: procurementDTO } });
  }




  partecipationDC: string[] = ["id", "proposer", "modality", "type", "status", "buttons"];
  partecipationDTOs: PartecipationDTO[];
  partecipationError: any;
  
  async loadPartecipation() {
    let filters = {
      procurementLotIdEquals: this.procurementLotDTO.id
    };
    this.partecipationDTOs = await this.partecipationResourceService.getAllPartecipationsUsingGET(filters).toPromise(); 
  }

  newPartecipation(procurementLot: ProcurementLotDTO): void {
    this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { procurementLot: procurementLot } });
  }

}