import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import {  InsurancePolicyDTO, InsurancePolicyResourceService, PartecipationDTO, PartecipationResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigInsurancePolicyNewUpdateDialogComponent } from "../insurance-policy-new-update-dialog/insurance-policy-new-update-dialog.component";


@Component({
  selector: 'aig-insurance-policy-detail-page',
  templateUrl: './insurance-policy-detail-page.component.html',
  styleUrls: ['./insurance-policy-detail-page.component.scss']
})
export class AigInsurancePolicyDetailPageComponent extends GenericComponent {
  constructor(
    private insurancePolicyResourceService: InsurancePolicyResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  insurancePolicyDTO: InsurancePolicyDTO;

  insurancePolicyConfig = {
    details: true,
    removeInsurancePolicy: null,
  }

  loadPage() {
    this.insurancePolicyDTO = this.route.snapshot.data.insurancePolicy;

    this.insurancePolicyConfig.removeInsurancePolicy = this.insurancePolicyDTO;
  }

  async reloadPage() {
    this.insurancePolicyDTO = await this.insurancePolicyResourceService.getInsurancePolicyUsingGET(this.insurancePolicyDTO.id).toPromise();
  }

  editInsurancePolicy(insurancePolicyDTO: InsurancePolicyDTO) {
    this.dialog.open(AigInsurancePolicyNewUpdateDialogComponent, { data: { insurancePolicy: insurancePolicyDTO } });
  }

  async deleteInsurancePolicy(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.insurancePolicyResourceService.deleteInsurancePolicyUsingDELETE(id).toPromise();

      this._snackBar.open(`InsurancePolicy: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'insurance-policy']);
    } catch (e) {
      this._snackBar.open(`Error during deleting insurance policy: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }
}