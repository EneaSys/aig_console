import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { InsurancePolicyStatusDTO, InsurancePolicyStatusResourceService,  } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigInsurancePolicyStatusNewUpdateDialogComponent } from "../insurance-policy-status-new-update-dialog/insurance-policy-status-new-update-dialog.component";
import { AigProcurementNewUpdateDialogComponent } from "../procurement-new-update-dialog/procurement-new-update-dialog.component";


@Component({
  selector: 'aig-insurance-policy-status-detail-page',
  templateUrl: './insurance-policy-status-detail-page.component.html',
  styleUrls: ['./insurance-policy-status-detail-page.component.scss']
})
export class AigInsurancePolicyStatusDetailPageComponent extends GenericComponent {
  constructor(
    private insurancePolicyStatusResourceService: InsurancePolicyStatusResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

    insurancePolicyStatus: InsurancePolicyStatusDTO;

  

loadPage() {
    this.insurancePolicyStatus = this.route.snapshot.data.insurancePolicyStatus;
}



async reloadPage() {
  this.insurancePolicyStatus = await this.insurancePolicyStatusResourceService.getInsurancePolicyStatusUsingGET(this.insurancePolicyStatus.id).toPromise();
  
}



  editInsurancePolicyStatus(insurancePolicyStatus: InsurancePolicyStatusDTO) {
    this.dialog.open(AigInsurancePolicyStatusNewUpdateDialogComponent, { data: { insurancePolicyStatus: insurancePolicyStatus } });
  }

  async deleteInsurancePolicyStatus(insurancePolicyStatus: InsurancePolicyStatusDTO) {
    this._fuseProgressBarService.show();

    try {
      await this.insurancePolicyStatusResourceService.deleteInsurancePolicyStatusUsingDELETE(insurancePolicyStatus.id).toPromise();

      this._snackBar.open(`InsurancePolicyStatus: '${insurancePolicyStatus.id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'insurancePolicyStatus']);
    } catch (e) {
      this._snackBar.open(`Error during deleting insurance policy status: '${insurancePolicyStatus.id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }

  
}