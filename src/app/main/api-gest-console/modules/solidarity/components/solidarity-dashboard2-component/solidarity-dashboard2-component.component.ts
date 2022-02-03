import { Component, OnInit } from '@angular/core';
import { AigSolidarityRequestCalculatorService } from 'aig-common/modules/solidarity/services/solidarityRequestCalulator.service';
import { FormDataDTO, FormDataResourceService } from 'aig-generic';
import { FamilyUnitResourceService, FoodProductRequestDTO, FoodProductRequestResourceService } from 'aig-solidarety';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './solidarity-dashboard2-component.component.html',
    styleUrls: ['./solidarity-dashboard2-component.component.scss']
})
export class AigSolidarityDashboard2Component extends GenericComponent {
    constructor(
		private formDataResourceService: FormDataResourceService,
        public solidarityRequestCalculatorService: AigSolidarityRequestCalculatorService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    formDataDTOs: FormDataDTO[] = null;

    async loadComponent() {
		let filter = {
			size: 500,
			"formTypeIdEquals": 2
		};
        this.formDataDTOs = await this.formDataResourceService.getAllFormDataUsingGET(filter).toPromise();

        this.calculator(this.formDataDTOs);
    }

    numberOfRequests: number = 0;

    total: number = 0;
    totalCount: number = 0;
    totalNotCount: number = 0;


    list: FormDataDTO[] = [];
    listTmp: FormDataDTO[] = [];



    listA: FormDataDTO[] = [];
    listAtmp: FormDataDTO[] = [];

    fA: number = 0;
    fAcount: number = 0;

    fA2: number = 0;
    fA2count: number = 0;

    fA3: number = 0;
    fA3count: number = 0;

    fA4: number = 0;
    fA4count: number = 0;



    listB: FormDataDTO[] = [];
    listBtmp: FormDataDTO[] = [];

    fB: number = 0;
    fBcount: number = 0;

    fB2: number = 0;
    fB2count: number = 0;

    fB3: number = 0;
    fB3count: number = 0;

    fB4: number = 0;
    fB4count: number = 0;


    calculator(formDataDTOs: FormDataDTO[]) {
        this.numberOfRequests = this.formDataDTOs.length;
        formDataDTOs.forEach((formDataDTO: FormDataDTO) => {
            if (formDataDTO.n4 != 10) { // non approvate
                this.totalNotCount += 1;
                return;
            }


            let calculatdValue = this.solidarityRequestCalculatorService.calculate4(formDataDTO);

            let familyComponents: number = formDataDTO.n1 + formDataDTO.n2;

            this.listTmp.push(formDataDTO);

            if(formDataDTO.s10 == "A") {			// FASCIA A
                this.listAtmp.push(formDataDTO);

                if(familyComponents < 3) {
                    this.fA2 += calculatdValue;
                    this.fA2count += 1
                } else if(familyComponents == 3 ) {
                    this.fA3 += calculatdValue;
                    this.fA3count += 1
                } else if(familyComponents > 3 ) {
                    this.fA4 += calculatdValue;
                    this.fA4count += 1
                }
            }
			if(formDataDTO.s10 == "B") {			// FASCIA B
                this.listBtmp.push(formDataDTO);

                if(familyComponents < 3) {
                    this.fB2 += calculatdValue;
                    this.fB2count += 1
                } else if(familyComponents == 3 ) {
                    this.fB3 += calculatdValue;
                    this.fB3count += 1
                } else if(familyComponents > 3 ) {
                    this.fB4 += calculatdValue;
                    this.fB4count += 1
                }
            }
        });

        this.fA = this.fA2 + this.fA3 + this.fA4;
        this.fAcount = this.fA2count + this.fA3count + this.fA4count;

        this.fB = this.fB2 + this.fB3 + this.fB4;
        this.fBcount = this.fB2count + this.fB3count + this.fB4count;

        this.total = this.fA + this.fB;
        this.totalCount = this.fAcount + this.fBcount;

        this.list = this.listTmp;
        this.listA = this.listAtmp;
        this.listB = this.listBtmp;
    }

}
