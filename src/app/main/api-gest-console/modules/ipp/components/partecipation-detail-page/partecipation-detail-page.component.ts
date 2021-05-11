import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import {  DesignatedCompanyDTO, DesignatedCompanyResourceService, InsurancePolicyDTO, InsurancePolicyResourceService, PartecipationDTO, PartecipationResourceService, PreparationDTO, PreparationResourceService } from "aig-italianlegislation";
import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigPartecipationNewUpdateDialogComponent } from "../partecipation-new-update-dialog/partecipation-new-update-dialog.component";


@Component({
  selector: 'aig-partecipation-detail-page',
  templateUrl: './partecipation-detail-page.component.html',
  styleUrls: ['./partecipation-detail-page.component.scss']
})
export class AigPartecipationDetailPageComponent extends GenericComponent {
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

  designatedCompanyDC: string[] = ["id","companyEopoo","partecipation","note", "buttons"];
  designatedCompanyDTOs: DesignatedCompanyDTO[];
  designatedCompanyError: any;
  async loadDesignatedCompany() {
    let filters = {
      partecipationIdEquals: this.partecipationDTO.id
    };
    try {
      this.designatedCompanyDTOs = await this.designatedCompanyResourceService.getAllDesignatedCompaniesUsingGET(filters).toPromise();
    } catch (e) {
      this.designatedCompanyError = e;
    }
  }

  insurancePolicyDC: string[] = ["id","companyPreparatorEopoo","note","partecipationProposerEopoo","status","totalAmount","buttons"];
  insurancePolicyDTOs: InsurancePolicyDTO[];
  insurancePolicyError: any;
  async loadInsurancePolicy() {
    let filters = {
      partecipationIdEquals: this.partecipationDTO.id
    };
    try {
      this.insurancePolicyDTOs = await this.insurancePolicyResourceService.getAllInsurancePoliciesUsingGET(filters).toPromise();
    } catch (e) {
      this.insurancePolicyError = e;
    }
  }

  preparationDC: string[] = ["id","companyPreparatorEopoo","note","partecipationId","partecipationProposerEopoo","statusDescription","buttons"];
  preparationDTOs: PreparationDTO[];
  preparationError: any;
  async loadPreparation() {
    let filters = {
      partecipationIdEquals: this.partecipationDTO.id
    };
    try {
      this.preparationDTOs = await this.preparationResourceService.getAllPreparationsUsingGET(filters).toPromise();
    } catch (e) {
      this.preparationError = e;
    }
  }

}