import { Component, OnInit } from '@angular/core';
import { AigSolidarityRequestCalculatorService } from 'aig-common/modules/solidarity/services/solidarityRequestCalulator.service';
import { FamilyUnitResourceService, FoodProductRequestDTO, FoodProductRequestResourceService } from 'aig-solidarety';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    templateUrl: './solidarity-dashboard2-component.component.html',
    styleUrls: ['./solidarity-dashboard2-component.component.scss']
})
export class AigSolidarityDashboard2Component extends GenericComponent {
    constructor(
        public solidarityRequestCalculatorService: AigSolidarityRequestCalculatorService,
        private foodProductRequestResourceService: FoodProductRequestResourceService,
        private familyUnitResourceService: FamilyUnitResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    foodProductRequestDTOs: FoodProductRequestDTO[] = null;

    async loadComponent() {
        this.foodProductRequestDTOs = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 3, null, null, null, null, null, null, null, 1000, null, null, null, null, null).toPromise();

        this.calculator(this.foodProductRequestDTOs);
    }

    numberOfRequests: number = 0;

    total: number = 0;
    totalCount: number = 0;
    totalCountComodato: number = 0;
    totalNotCount: number = 0;


    list: FoodProductRequestDTO[] = [];
    listTmp: FoodProductRequestDTO[] = [];



    listA: FoodProductRequestDTO[] = [];
    listAtmp: FoodProductRequestDTO[] = [];

    fA: number = 0;
    fAcount: number = 0;

    fA2: number = 0;
    fA2count: number = 0;

    fA3: number = 0;
    fA3count: number = 0;

    fA4: number = 0;
    fA4count: number = 0;



    listB: FoodProductRequestDTO[] = [];
    listBtmp: FoodProductRequestDTO[] = [];

    fB: number = 0;
    fBcount: number = 0;

    fB2: number = 0;
    fB2count: number = 0;

    fB3: number = 0;
    fB3count: number = 0;

    fB4: number = 0;
    fB4count: number = 0;


    calculator(foodProductRequestDTOs: FoodProductRequestDTO[]) {
        this.numberOfRequests = this.foodProductRequestDTOs.length;
        foodProductRequestDTOs.forEach((foodProductRequestDTO: FoodProductRequestDTO) => {
            if (foodProductRequestDTO.note != "3") { // non approvate
                this.totalNotCount += 1;
                return;
            }


            let calculatdValue = this.solidarityRequestCalculatorService.calculate3(foodProductRequestDTO);

            let familyComponents: number = foodProductRequestDTO.familyUnit.adultNumber + foodProductRequestDTO.familyUnit.childrenNumber;

            this.listTmp.push(foodProductRequestDTO);

            if(foodProductRequestDTO.familyUnit.city == "") {   // FASCIA A
                this.listAtmp.push(foodProductRequestDTO);

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
            } else {                                            // FASCIA B
                this.listBtmp.push(foodProductRequestDTO);

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
            if (foodProductRequestDTO.requestStatusA) {
                this.totalCountComodato += 1
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
