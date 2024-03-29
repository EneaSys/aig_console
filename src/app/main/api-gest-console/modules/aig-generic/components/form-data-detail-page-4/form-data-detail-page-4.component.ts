import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EopooTypeDTO, EopooTypeResourceService, FormDataDTO, FormDataResourceService } from 'aig-generic';

import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { AuthService } from 'auth/auth.service';
import { AigSolidarityRequestCalculatorService } from 'aig-common/modules/solidarity/services/solidarityRequestCalulator.service';
import { AigFamilyInformationService } from 'aig-common/modules/solidarity/services/familyInformation.service';

@Component({
    templateUrl: './form-data-detail-page-4.component.html',
    styleUrls: ['./form-data-detail-page-4.component.scss']
})
export class AigFormDataDetailPage4Component extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private formDataResourceService: FormDataResourceService,
		private aigFamilyInformationService: AigFamilyInformationService,
		public calculatorService: AigSolidarityRequestCalculatorService,
		private eventService: EventService,
		private authService: AuthService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    formDataDTO: FormDataDTO;
	user: any;
	async loadPage() {
		this.formDataDTO = this.route.snapshot.data.formData;
		this.user = await this.authService.getUser();
		this.afterLoad2();
	}

    async reloadPage() {
		this.formDataDTO = await this.formDataResourceService.getFormDataUsingGET(this.formDataDTO.id).toPromise();
		this.afterLoad2();
	}

	instructor: any = null;
	family: any[];
	async afterLoad2() {
		if(this.formDataDTO.s15) {
            let instructor = this.formDataDTO.s15.split('|');
			this.instructor = {
				id: instructor[0],
				name: instructor[1]
			}
        }
		try {
            this.family = await this.aigFamilyInformationService.getFamily(this.formDataDTO.s4).toPromise();
            this.family.forEach(async familyMember => {
				let filters = {
					s4Contains: familyMember.codice_fiscale_non_validato,
					formTypeIdEquals: 4
				};
                familyMember.numero_domande = await this.formDataResourceService.countFormDataUsingGET(filters).toPromise();
            });
        } catch(e) {
            console.log(e);
        }
	}

	async setStatus(state: number) {
		var formDataDTO = Object.assign({}, this.formDataDTO);
		formDataDTO.n4 = state;
		formDataDTO.s15 = this.user.sub + "|" + this.user.lastName + " " + this.user.firstName;
		await this.formDataResourceService.updateFormDataUsingPUT(formDataDTO).toPromise();
		this.eventService.reloadCurrentPage();
	}

	checkUserCanManage() {
		if(this.formDataDTO.s15 == null) {
			return true;
		}
		if(this.instructor && this.instructor.id == this.user.sub) {
			return true;
		}
		if(this.formDataDTO.n4 > 5) {
			return true;
		}
		return false;
	}
}
