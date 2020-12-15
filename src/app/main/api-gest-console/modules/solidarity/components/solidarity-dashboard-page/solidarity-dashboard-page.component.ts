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

    total: number = 0;

    
    
    totalApproved: number = 0;
    totalAmountApproved: number = 0;

    totalMin5: number = 0;
    totalAmountMin5: number = 0;

    totalMor5: number = 0;
    totalAmountMor5: number = 0;



    totalApprovedA: number = 0;
    totalAmountApprovedA: number = 0;

    totalMin5A: number = 0;
    totalAmountMin5A: number = 0;

    totalMor5A: number = 0;
    totalAmountMor5A: number = 0;




    totalApprovedB: number = 0;
    totalAmountApprovedB: number = 0;

    totalMin5B: number = 0;
    totalAmountMin5B: number = 0;

    totalMor5B: number = 0;
    totalAmountMor5B: number = 0;




    totalApprovedC: number = 0;
    totalAmountApprovedC: number = 0;

    totalMin5C: number = 0;
    totalAmountMin5C: number = 0;

    totalMor5C: number = 0;
    totalAmountMor5C: number = 0;





    totalApprovedD: number = 0;
    totalAmountApprovedD: number = 0;

    totalMin5D: number = 0;
    totalAmountMin5D: number = 0;

    totalMor5D: number = 0;
    totalAmountMor5D: number = 0;




    totalApprovedE: number = 0;
    totalAmountApprovedE: number = 0;

    totalMin5E: number = 0;
    totalAmountMin5E: number = 0;

    totalMor5E: number = 0;
    totalAmountMor5E: number = 0;



    totalApprovedF: number = 0;
    totalAmountApprovedF: number = 0;

    totalMin5F: number = 0;
    totalAmountMin5F: number = 0;

    totalMor5F: number = 0;
    totalAmountMor5F: number = 0;



    loadComponent() {
        this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1000, null, null, null, null, null)
            .subscribe(
                (foodProductRequestDTOs: FoodProductRequestDTO[]) => this.populateData(foodProductRequestDTOs)
            );
    }

    populateData(foodProductRequestDTOs: FoodProductRequestDTO[]) {
        this.total = foodProductRequestDTOs.length;

        foodProductRequestDTOs.forEach(foodProductRequestDTO => {

            if (foodProductRequestDTO.note == "3") {
                // Approvate
                this.totalApproved = this.totalApproved + 1;
                this.totalAmountApproved = this.totalAmountApproved + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                switch (foodProductRequestDTO.familyUnit.postalCode) {
                    case 'A':
                        this.totalApprovedA = this.totalApprovedA + 1;
                        this.totalAmountApprovedA = this.totalAmountApprovedA + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    break;
                    case 'B':
                        this.totalApprovedB = this.totalApprovedB + 1;
                        this.totalAmountApprovedB = this.totalAmountApprovedB + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    break;
                    case 'C':
                        this.totalApprovedC = this.totalApprovedC + 1;
                        this.totalAmountApprovedC = this.totalAmountApprovedC + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    break;
                    case 'D':
                        this.totalApprovedD = this.totalApprovedD + 1;
                        this.totalAmountApprovedD = this.totalAmountApprovedD + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    break;
                    case 'E':
                        this.totalApprovedE = this.totalApprovedE + 1;
                        this.totalAmountApprovedE = this.totalAmountApprovedE + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    break;
                    case 'F':
                        this.totalApprovedF = this.totalApprovedF + 1;
                        this.totalAmountApprovedF = this.totalAmountApprovedF + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                    break;
                }

                switch (foodProductRequestDTO.familyUnit.telephone) {
                    case 'A':
                        // Meno di 5000
                        this.totalMin5 = this.totalMin5 + 1;
                        this.totalAmountMin5 = this.totalAmountMin5 + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);       

                        

                        switch (foodProductRequestDTO.familyUnit.postalCode) {
                            case 'A':
                                this.totalMin5A = this.totalMin5A + 1;
                                this.totalAmountMin5A = this.totalAmountMin5A + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'B':
                                this.totalMin5B = this.totalMin5B + 1;
                                this.totalAmountMin5B = this.totalAmountMin5B + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'C':
                                this.totalMin5C = this.totalMin5C + 1;
                                this.totalAmountMin5C = this.totalAmountMin5C + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'D':
                                this.totalMin5D = this.totalMin5D + 1;
                                this.totalAmountMin5D = this.totalAmountMin5D + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'E':
                                this.totalMin5E = this.totalMin5E + 1;
                                this.totalAmountMin5E = this.totalAmountMin5E + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'F':
                                this.totalMin5F = this.totalMin5F + 1;
                                this.totalAmountMin5F = this.totalAmountMin5F + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                        }

                        break;
                    case 'B':
                        // Più di 5000
                        this.totalMor5 = this.totalMor5 + 1;
                        this.totalAmountMor5 = this.totalAmountMor5 + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);       



                        switch (foodProductRequestDTO.familyUnit.postalCode) {
                            case 'A':
                                this.totalMor5A = this.totalMor5A + 1;
                                this.totalAmountMor5A = this.totalAmountMor5A + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'B':
                                this.totalMor5B = this.totalMor5B + 1;
                                this.totalAmountMor5B = this.totalAmountMor5B + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'C':
                                this.totalMor5C = this.totalMor5C + 1;
                                this.totalAmountMor5C = this.totalAmountMor5C + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'D':
                                this.totalMor5D = this.totalMor5D + 1;
                                this.totalAmountMor5D = this.totalAmountMor5D + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'E':
                                this.totalMor5E = this.totalMor5E + 1;
                                this.totalAmountMor5E = this.totalAmountMor5E + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                            case 'F':
                                this.totalMor5F = this.totalMor5F + 1;
                                this.totalAmountMor5F = this.totalAmountMor5F + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                            break;
                        }

                        break;
                }
            }

            
        });
    }


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
}
