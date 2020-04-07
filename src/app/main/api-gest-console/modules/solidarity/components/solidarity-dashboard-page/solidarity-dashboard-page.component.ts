import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { FoodProductRequestResourceService, FamilyUnitResourceService, FoodProductRequestDTO } from 'aig-solidarety';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigSolidarityRequestCalculatorService } from 'aig-common/modules/solidarity/services/solidarityRequestCalulator.service';

@Component({
    templateUrl: './solidarity-dashboard-page.component.html',
    styleUrls: ['./solidarity-dashboard-page.component.scss']
})
export class AigSolidarityDashboardComponent extends GenericComponent {
    constructor(
        private aigSolidarityRequestCalculatorService: AigSolidarityRequestCalculatorService,
        private foodProductRequestResourceService: FoodProductRequestResourceService,
        private familyUnitResourceService: FamilyUnitResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns = [ "surname", "name", "cf", "amount", "familyTotal" ]

    foodProductRequestDTOs: FoodProductRequestDTO[] = [];

    totalAmountApproved: number = 0;
    
    foodProductRequestDTOsA: FoodProductRequestDTO[] = [];
    foodProductRequestDTOsB: FoodProductRequestDTO[] = [];
    foodProductRequestDTOsC: FoodProductRequestDTO[] = [];

    totalUnique: number = 0;

    totalAmountInamissible: number = 0;
    totalInamissible: number = 0;

    totalAmountNotAproved: number = 0;
    totalNotAproved: number = 0;

    async loadComponent() {
        this.foodProductRequestDTOs = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1000,null,null,null,null,null).toPromise();

        let foodProductRequestDTOsA: FoodProductRequestDTO[] = [];
        let foodProductRequestDTOsB: FoodProductRequestDTO[] = [];
        let foodProductRequestDTOsC: FoodProductRequestDTO[] = [];

        this.foodProductRequestDTOs.forEach(foodProductRequestDTO => {
            if(foodProductRequestDTO.note != "97") {
                this.totalUnique = this.totalUnique + 1;
            }

            if(foodProductRequestDTO.note == "96") {
                this.totalAmountInamissible = this.totalAmountInamissible + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                this.totalInamissible = this.totalInamissible + 1;
            }

            if(foodProductRequestDTO.note == "99") {
                this.totalAmountNotAproved = this.totalAmountNotAproved + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                this.totalNotAproved = this.totalNotAproved + 1;
            }

            if(foodProductRequestDTO.note == "2") {
                this.totalAmountApproved = this.totalAmountApproved + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                if(foodProductRequestDTO.requestStatusA) {
                    foodProductRequestDTOsA.push(foodProductRequestDTO);
                }
                if(foodProductRequestDTO.requestStatusB) {
                    foodProductRequestDTOsB.push(foodProductRequestDTO);
                }
                if(foodProductRequestDTO.requestStatusC) {
                    foodProductRequestDTOsC.push(foodProductRequestDTO);
                }
            }
        });
        this.foodProductRequestDTOsA = foodProductRequestDTOsA;
        this.foodProductRequestDTOsB = foodProductRequestDTOsB;
        this.foodProductRequestDTOsC = foodProductRequestDTOsC;
    }
}
