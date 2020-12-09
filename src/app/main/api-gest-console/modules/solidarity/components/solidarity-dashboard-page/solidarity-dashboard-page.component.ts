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

    displayedColumns = ["surname", "name", "cf", "amount", "familyTotal"]
    displayedColumnsB = ["surname", "name", "cf", "amount", "incomeMar", "familyTotal"]

    foodProductRequestDTOs: FoodProductRequestDTO[] = [];

    totalAmountApproved: number = 0;

    totalAmountA: number = 0;
    foodProductRequestDTOsA: FoodProductRequestDTO[] = [];
    totalAmountB: number = 0;
    foodProductRequestDTOsB: FoodProductRequestDTO[] = [];
    totalAmountC: number = 0;
    foodProductRequestDTOsC: FoodProductRequestDTO[] = [];

    totalAmountApprovedAfter: number = 0;

    totalAmountAafter: number = 0;
    foodProductRequestDTOsAafter: FoodProductRequestDTO[] = [];
    totalAmountBafter: number = 0;
    foodProductRequestDTOsBafter: FoodProductRequestDTO[] = [];
    totalAmountCafter: number = 0;
    foodProductRequestDTOsCafter: FoodProductRequestDTO[] = [];


    totalUnique: number = 0;

    totalAmountInamissible: number = 0;
    totalInamissible: number = 0;

    totalAmountNotAproved: number = 0;
    totalNotAproved: number = 0;

    totalAmountReleased: number = 0;
    totalReleased: number = 0;

    omonimi = {};

    async loadComponent() {
        this.foodProductRequestDTOs = await this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1000, null, null, null, null, null).toPromise();

        let foodProductRequestDTOsA: FoodProductRequestDTO[] = [];
        let foodProductRequestDTOsB: FoodProductRequestDTO[] = [];
        let foodProductRequestDTOsC: FoodProductRequestDTO[] = [];

        let foodProductRequestDTOsAafter: FoodProductRequestDTO[] = [];
        let foodProductRequestDTOsBafter: FoodProductRequestDTO[] = [];
        let foodProductRequestDTOsCafter: FoodProductRequestDTO[] = [];

        this.foodProductRequestDTOs.forEach(foodProductRequestDTO => {
            if (foodProductRequestDTO.note != "97") {
                this.totalUnique = this.totalUnique + 1;
            }

            if (foodProductRequestDTO.note == "95") {
                this.totalAmountReleased = this.totalAmountReleased + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                this.totalReleased = this.totalReleased + 1;
            }

            if (foodProductRequestDTO.note == "96") {
                this.totalAmountInamissible = this.totalAmountInamissible + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                this.totalInamissible = this.totalInamissible + 1;
            }

            if (foodProductRequestDTO.note == "99") {
                this.totalAmountNotAproved = this.totalAmountNotAproved + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                this.totalNotAproved = this.totalNotAproved + 1;
            }

            if (foodProductRequestDTO.note == "2") {
                this.totalAmountApproved = this.totalAmountApproved + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                if (foodProductRequestDTO.requestStatusA) {
                    this.totalAmountA = this.totalAmountA + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    foodProductRequestDTOsA.push(foodProductRequestDTO);
                }
                if (foodProductRequestDTO.requestStatusB) {
                    this.totalAmountB = this.totalAmountB + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    foodProductRequestDTOsB.push(foodProductRequestDTO);
                }
                if (foodProductRequestDTO.requestStatusC) {
                    this.totalAmountC = this.totalAmountC + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    foodProductRequestDTOsC.push(foodProductRequestDTO);
                }
            }
            this.foodProductRequestDTOsA = foodProductRequestDTOsA;
            this.foodProductRequestDTOsB = foodProductRequestDTOsB;
            this.foodProductRequestDTOsC = foodProductRequestDTOsC;



            if (foodProductRequestDTO.note == "3") {
                this.totalAmountApprovedAfter = this.totalAmountApprovedAfter + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                if (foodProductRequestDTO.requestStatusA) {
                    this.totalAmountAafter = this.totalAmountAafter + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    foodProductRequestDTOsAafter.push(foodProductRequestDTO);
                }
                if (foodProductRequestDTO.requestStatusB) {
                    this.totalAmountBafter = this.totalAmountBafter + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    foodProductRequestDTOsBafter.push(foodProductRequestDTO);
                }
                if (foodProductRequestDTO.requestStatusC) {
                    this.totalAmountCafter = this.totalAmountCafter + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    foodProductRequestDTOsCafter.push(foodProductRequestDTO);
                }
            }
            this.foodProductRequestDTOsAafter = foodProductRequestDTOsAafter;
            this.foodProductRequestDTOsBafter = foodProductRequestDTOsBafter;
            this.foodProductRequestDTOsCafter = foodProductRequestDTOsCafter;

            // Casi di omonimia
            /*
            if (foodProductRequestDTO.note != "97") {
                this.foodProductRequestDTOs.forEach(foodProductRequestDTO2 => {
                    if (foodProductRequestDTO2.note != "97") {
                        if (foodProductRequestDTO.familyUnit.taxId.replace(" ", "").toUpperCase() != foodProductRequestDTO2.familyUnit.taxId.replace(" ", "").toUpperCase()) {
                            if (foodProductRequestDTO.familyUnit.name.replace(" ", "").toUpperCase() == foodProductRequestDTO2.familyUnit.name.replace(" ", "").toUpperCase()) {
                                if (foodProductRequestDTO.familyUnit.surname.replace(" ", "").toUpperCase() == foodProductRequestDTO2.familyUnit.surname.replace(" ", "").toUpperCase()) {
                                    this.omonimi[foodProductRequestDTO.familyUnit.surname.replace(" ", "").toUpperCase() + "-" + foodProductRequestDTO.familyUnit.name.replace(" ", "").toUpperCase()] = true;
                                }
                            }
                        }
                    }
                });
            }
            */
        });

    }
}
