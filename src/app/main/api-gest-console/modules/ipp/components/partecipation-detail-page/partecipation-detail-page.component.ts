import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { DesignatedCompanyDTO, DesignatedCompanyResourceService, InsurancePolicyDTO, InsurancePolicyResourceService, PartecipationDTO, PartecipationResourceService, PreparationDTO, PreparationResourceService } from "aig-italianlegislation";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigDesignatedCompanyNewUpdateDialogComponent } from "../designated-company-new-update-dialog/designated-company-new-update-dialog.component";
import { AigInsurancePolicyNewUpdateDialogComponent } from "../insurance-policy-new-update-dialog/insurance-policy-new-update-dialog.component";
import { AigIppGenericComponent } from "../ipp-generic-component";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";
import { AigPreparationNewUpdateDialogComponent } from "../preparation-new-update-dialog/preparation-new-update-dialog.component";


@Component({
  selector: 'aig-partecipation-detail-page',
  templateUrl: './partecipation-detail-page.component.html',
  styleUrls: ['./partecipation-detail-page.component.scss']
})
export class AigPartecipationDetailPageComponent extends AigIppGenericComponent {
  constructor(
    private partecipationResourceService: PartecipationResourceService,
    private designatedCompanyResourceService: DesignatedCompanyResourceService,
    private insurancePolicyResourceService: InsurancePolicyResourceService,
    private preparationResourceService: PreparationResourceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _fuseProgressBarService: FuseProgressBarService,
    private router: Router,
    private _snackBar: MatSnackBar,
    aigGenericComponentService: AigGenericComponentService,
  ) { super(aigGenericComponentService) }

  partecipationDTO: PartecipationDTO;

  loadPage() {
    this.partecipationDTO = this.route.snapshot.data.partecipation;
    this.loadOther();
  }

  async reloadPage() {
    this.partecipationDTO = await this.partecipationResourceService.getPartecipationUsingGET(this.partecipationDTO.id).toPromise();
    this.loadOther();
  }

  async loadOther() {
    this.loadDesignatedCompany();
    this.loadInsurancePolicy();
    this.loadPreparation();
  }

  editPartecipation(partecipationDTO: PartecipationDTO) {
    this.dialog.open(AigPartecipationNewUpdateDialogComponent, { data: { partecipation: partecipationDTO } });
  }

  async deletePartecipation(id: number) {
    this._fuseProgressBarService.show();

    try {
      await this.partecipationResourceService.deletePartecipationUsingDELETE(id).toPromise();

      this._snackBar.open(`Partecipation: '${id}' deleted.`, null, { duration: 2000, });

      this.router.navigate(['/ipp', 'partecipation']);
    } catch (e) {
      this._snackBar.open(`Error during deleting partecipation: '${id}'. (${e.message})`, null, { duration: 5000, });
    }
    this._fuseProgressBarService.hide();
  }

  designatedCompanyDC: string[] = ["id", "companyEopoo", "partecipation", "note", "buttons"];
  designatedCompanyDTOs: DesignatedCompanyDTO[];
  designatedCompanyError: any;

  async loadDesignatedCompany() {
    let filters = {
      partecipationIdEquals: this.partecipationDTO.id
    };
    this.designatedCompanyDTOs = await this.designatedCompanyResourceService.getAllDesignatedCompaniesUsingGET(filters).toPromise();
  }

  newDesignatedCompany(partecipationDTO: PartecipationDTO): void {
    this.dialog.open(AigDesignatedCompanyNewUpdateDialogComponent, { data: { designatedCompany: {}, partecipation: partecipationDTO } });
  }

  insurancePolicyDC: string[] = ["id", "companyPreparatorEopoo", "note", "partecipationProposerEopoo", "status", "totalAmount", "buttons"];
  insurancePolicyDTOs: InsurancePolicyDTO[];
  insurancePolicyError: any;

  async loadInsurancePolicy() {
    let filters = {
      partecipationIdEquals: this.partecipationDTO.id
    };
    this.insurancePolicyDTOs = await this.insurancePolicyResourceService.getAllInsurancePoliciesUsingGET(filters).toPromise();
  }

  newInsurancePolicy(partecipationDTO: PartecipationDTO): void {
    this.dialog.open(AigInsurancePolicyNewUpdateDialogComponent, { data: { insurancePolicy: {}, partecipation: partecipationDTO } });
  }

  preparationDC: string[] = ["id", "companyPreparatorEopoo", "note", "partecipationId", "partecipationProposerEopoo", "statusDescription", "buttons"];
  preparationDTOs: PreparationDTO[];
  preparationError: any;

  async loadPreparation() {
    let filters = {
      partecipationIdEquals: this.partecipationDTO.id
    };
    this.preparationDTOs = await this.preparationResourceService.getAllPreparationsUsingGET(filters).toPromise();
  }

  newPreparation(partecipationDTO: PartecipationDTO): void {
    this.dialog.open(AigPreparationNewUpdateDialogComponent, { data: { partecipation: partecipationDTO } });
  }

}