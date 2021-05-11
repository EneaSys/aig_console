import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AigProcurementLotNewUpdateFormComponent } from "aig-common/modules/ipp/components/procurement-lot-new-update-form/procurement-lot-new-update-form.component";


import {  PartecipationDTO, PartecipationResourceService, ProcurementLotDTO, ProcurementLotResourceService,  } from "aig-italianlegislation";
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

  editProcurementLot(procurementLotDTO: ProcurementLotDTO) {
    this.dialog.open(AigProcurementLotNewUpdateDialogComponent, { data: { procurementLot: procurementLotDTO } });
  }

  async deleteProcurementLot(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.procurementLotResourceService.deleteProcurementLotUsingDELETE(id).toPromise();

      this._snackBar.open(`Procurement lot: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'procurement-lot']);
    } catch (e) {
      this._snackBar.open(`Error during deleting procurement lot: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }

  partecipationDC: string[] = ["id","contractorEopoo","procurementLotDescription","procurementLotCig","proposerEopooCode","expiryDate","baseAmount","ippLotCategoryCode","buttons"];
  partecipationDTOs: PartecipationDTO[];
  partecipationError: any;
  async loadPartecipation() {
    let filters = {
      procurementLotIdEquals: this.procurementLotDTO.id
    };
    try {
      this.partecipationDTOs = await this.partecipationResourceService.getAllPartecipationsUsingGET(filters).toPromise();
    } catch (e) {
      this.partecipationError = e;
    }
  }

}