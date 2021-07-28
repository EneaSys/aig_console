import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { AddressDTO, AddressResourceService } from "aig-generic";
import { PartecipationDTO, PartecipationResourceService, ProcurementDTO, ProcurementLotDTO, ProcurementLotResourceService } from "aig-italianlegislation";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigIppGenericComponent } from "../../../ipp/components/ipp-generic-component";
import { AigPartecipationNewUpdateDialogComponent } from "../../../ipp/components/partecipation-new-update-dialog/partecipation-new-update-dialog.component";
import { AigAddressNewUpdateModalComponent } from "../address-new-update-modal/address-new-update-modal.component";


@Component({
  selector: 'enzo-address-detail-page',
  templateUrl: './address-detail-page.component.html',
  styleUrls: ['./address-detail-page.component.scss']
})
export class EnzoAddressDetailPageComponent extends AigIppGenericComponent {
  constructor(
    private addressResourceService: AddressResourceService,
    private partecipationResourceService: PartecipationResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  addressDTO: AddressDTO;

  loadPage() {
    this.addressDTO = this.route.snapshot.data.address;
    this.loadOther();
  }

  async reloadPage() {
    this.addressDTO = await this.addressResourceService.getAddressUsingGET(this.addressDTO.id).toPromise();
    this.loadOther();
  }

  async loadOther() {
    this.loadPartecipation();
  }

  editAddress(address: AddressDTO) {
    this.dialog.open(AigAddressNewUpdateModalComponent, { data: { address: address } });
  }

  async deleteAddress(addressDTO: AddressDTO) {
    this._fuseProgressBarService.show();

    try {
      await this.addressResourceService.deleteAddressUsingDELETE(addressDTO.id).toPromise();

      this._snackBar.open(`Procurement lot: '${addressDTO.id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'procurement-lot']);
    } catch (e) {
      this._snackBar.open(`Error during deleting procurement lot: '${addressDTO.id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }



  editAddressLot(addressDTO: AddressDTO) {
    this.dialog.open(AigAddressNewUpdateModalComponent, { data: { address: addressDTO } });
  }




  partecipationDC: string[] = ["id", "proposer", "type", "status", "buttons"];
  partecipationDTOs: PartecipationDTO[];
  partecipationError: any;
  
  async loadPartecipation() {
    let filters = {
      addressIdEquals: this.addressDTO.id
    };
    this.partecipationDTOs = await this.partecipationResourceService.getAllPartecipationsUsingGET(filters).toPromise(); 
  }

  newPartecipation(address: AddressDTO): void {
    this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { address: address } });
  }

}