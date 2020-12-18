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
    totalApprovedf: number = 0;
    totalAmountApproved: number = 0;
    totalApproved2: number = 0;
    totalApproved2f: number = 0;
    totalApproved3: number = 0;
    totalApproved3f: number = 0;
    totalApproved4: number = 0;
    totalApproved4f: number = 0;

    totalMin5: number = 0;
    totalMin5f: number = 0;
    totalAmountMin5: number = 0;
    totalMin52: number = 0;
    totalMin52f: number = 0;
    totalMin53: number = 0;
    totalMin53f: number = 0;
    totalMin54: number = 0;
    totalMin54f: number = 0;

    totalMor5: number = 0;
    totalMor5f: number = 0;
    totalAmountMor5: number = 0;
    totalMor52: number = 0;
    totalMor52f: number = 0;
    totalMor53: number = 0;
    totalMor53f: number = 0;
    totalMor54: number = 0;
    totalMor54f: number = 0;





        // Tipo A
    totalApprovedA: number = 0;
    totalApprovedAf: number = 0;
    totalAmountApprovedA: number = 0;
    totalApprovedA2: number = 0;
    totalApprovedA2f: number = 0;
    totalApprovedA3: number = 0;
    totalApprovedA3f: number = 0;
    totalApprovedA4: number = 0;
    totalApprovedA4f: number = 0;

    totalMin5A: number = 0;
    totalMin5Af: number = 0;
    totalAmountMin5A: number = 0;
    totalMin5A2: number = 0;
    totalMin5A2f: number = 0;
    totalMin5A3: number = 0;
    totalMin5A3f: number = 0;
    totalMin5A4: number = 0;
    totalMin5A4f: number = 0;

    totalMor5A: number = 0;
    totalMor5Af: number = 0;
    totalAmountMor5A: number = 0;
    totalMor5A2: number = 0;
    totalMor5A2f: number = 0;
    totalMor5A3: number = 0;
    totalMor5A3f: number = 0;
    totalMor5A4: number = 0;
    totalMor5A4f: number = 0;





        // Tipo B
    totalApprovedB: number = 0;
    totalApprovedBf: number = 0;
    totalAmountApprovedB: number = 0;
    totalApprovedB2: number = 0;
    totalApprovedB2f: number = 0;
    totalApprovedB3: number = 0;
    totalApprovedB3f: number = 0;
    totalApprovedB4: number = 0;
    totalApprovedB4f: number = 0;

    totalMin5B: number = 0;
    totalMin5Bf: number = 0;
    totalAmountMin5B: number = 0;
    totalMin5B2: number = 0;
    totalMin5B2f: number = 0;
    totalMin5B3: number = 0;
    totalMin5B3f: number = 0;
    totalMin5B4: number = 0;
    totalMin5B4f: number = 0;

    totalMor5B: number = 0;
    totalMor5Bf: number = 0;
    totalAmountMor5B: number = 0;
    totalMor5B2: number = 0;
    totalMor5B2f: number = 0;
    totalMor5B3: number = 0;
    totalMor5B3f: number = 0;
    totalMor5B4: number = 0;
    totalMor5B4f: number = 0;






    totalApprovedC: number = 0;
    totalApprovedCf: number = 0;
    totalAmountApprovedC: number = 0;
    totalApprovedC2: number = 0;
    totalApprovedC2f: number = 0;
    totalApprovedC3: number = 0;
    totalApprovedC3f: number = 0;
    totalApprovedC4: number = 0;
    totalApprovedC4f: number = 0;

    totalMin5C: number = 0;
    totalMin5Cf: number = 0;
    totalAmountMin5C: number = 0;
    totalMin5C2: number = 0;
    totalMin5C2f: number = 0;
    totalMin5C3: number = 0;
    totalMin5C3f: number = 0;
    totalMin5C4: number = 0;
    totalMin5C4f: number = 0;

    totalMor5C: number = 0;
    totalMor5Cf: number = 0;
    totalAmountMor5C: number = 0;
    totalMor5C2: number = 0;
    totalMor5C2f: number = 0;
    totalMor5C3: number = 0;
    totalMor5C3f: number = 0;
    totalMor5C4: number = 0;
    totalMor5C4f: number = 0;





    totalApprovedD: number = 0;
    totalApprovedDf: number = 0;
    totalAmountApprovedD: number = 0;
    totalApprovedD2: number = 0;
    totalApprovedD2f: number = 0;
    totalApprovedD3: number = 0;
    totalApprovedD3f: number = 0;
    totalApprovedD4: number = 0;
    totalApprovedD4f: number = 0;

    totalMin5D: number = 0;
    totalMin5Df: number = 0;
    totalAmountMin5D: number = 0;
    totalMin5D2: number = 0;
    totalMin5D2f: number = 0;
    totalMin5D3: number = 0;
    totalMin5D3f: number = 0;
    totalMin5D4: number = 0;
    totalMin5D4f: number = 0;

    totalMor5D: number = 0;
    totalMor5Df: number = 0;
    totalAmountMor5D: number = 0;
    totalMor5D2: number = 0;
    totalMor5D2f: number = 0;
    totalMor5D3: number = 0;
    totalMor5D3f: number = 0;
    totalMor5D4: number = 0;
    totalMor5D4f: number = 0;





    totalApprovedE: number = 0;
    totalApprovedEf: number = 0;
    totalAmountApprovedE: number = 0;
    totalApprovedE2: number = 0;
    totalApprovedE2f: number = 0;
    totalApprovedE3: number = 0;
    totalApprovedE3f: number = 0;
    totalApprovedE4: number = 0;
    totalApprovedE4f: number = 0;

    totalMin5E: number = 0;
    totalMin5Ef: number = 0;
    totalAmountMin5E: number = 0;
    totalMin5E2: number = 0;
    totalMin5E2f: number = 0;
    totalMin5E3: number = 0;
    totalMin5E3f: number = 0;
    totalMin5E4: number = 0;
    totalMin5E4f: number = 0;

    totalMor5E: number = 0;
    totalMor5Ef: number = 0;
    totalAmountMor5E: number = 0;
    totalMor5E2: number = 0;
    totalMor5E2f: number = 0;
    totalMor5E3: number = 0;
    totalMor5E3f: number = 0;
    totalMor5E4: number = 0;
    totalMor5E4f: number = 0;




    totalApprovedF: number = 0;
    totalApprovedFf: number = 0;
    totalAmountApprovedF: number = 0;
    totalApprovedF2: number = 0;
    totalApprovedF2f: number = 0;
    totalApprovedF3: number = 0;
    totalApprovedF3f: number = 0;
    totalApprovedF4: number = 0;
    totalApprovedF4f: number = 0;

    totalMin5F: number = 0;
    totalMin5Ff: number = 0;
    totalAmountMin5F: number = 0;
    totalMin5F2: number = 0;
    totalMin5F2f: number = 0;
    totalMin5F3: number = 0;
    totalMin5F3f: number = 0;
    totalMin5F4: number = 0;
    totalMin5F4f: number = 0;

    totalMor5F: number = 0;
    totalMor5Ff: number = 0;
    totalAmountMor5F: number = 0;
    totalMor5F2: number = 0;
    totalMor5F2f: number = 0;
    totalMor5F3: number = 0;
    totalMor5F3f: number = 0;
    totalMor5F4: number = 0;
    totalMor5F4f: number = 0;



    loadComponent() {
        this.foodProductRequestResourceService.getAllFoodProductRequestsUsingGET(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1000, null, null, null, null, null)
            .subscribe(
                (foodProductRequestDTOs: FoodProductRequestDTO[]) => this.populateData(foodProductRequestDTOs)
            );
    }

    populateData(foodProductRequestDTOs: FoodProductRequestDTO[]) {
        this.total = foodProductRequestDTOs.length;

        foodProductRequestDTOs.forEach(foodProductRequestDTO => {

            var nFamily: number = foodProductRequestDTO.familyUnit.adultNumber + foodProductRequestDTO.familyUnit.childrenNumber;

            if (foodProductRequestDTO.note == "3") {
                // Approvate
                this.totalApproved = this.totalApproved + 1;
                this.totalAmountApproved = this.totalAmountApproved + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                
                if(foodProductRequestDTO.requestStatusA) this.totalApprovedf++

                if(nFamily < 3) {
                    this.totalApproved2++;
                    if(foodProductRequestDTO.requestStatusA) this.totalApproved2f++
                } else if(nFamily == 3) {
                    this.totalApproved3++;
                    if(foodProductRequestDTO.requestStatusA) this.totalApproved3f++
                }  else if(nFamily > 3) {
                    this.totalApproved4++;
                    if(foodProductRequestDTO.requestStatusA) this.totalApproved4f++
                }

                switch (foodProductRequestDTO.familyUnit.postalCode) {
                    case 'A':
                        this.totalApprovedA = this.totalApprovedA + 1;
                        this.totalAmountApprovedA = this.totalAmountApprovedA + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                        if(foodProductRequestDTO.requestStatusA) this.totalApprovedAf++

                        if(nFamily < 3) {
                            this.totalApprovedA2++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedA2f++
                        } else if(nFamily == 3) {
                            this.totalApprovedA3++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedA3f++
                        }  else if(nFamily > 3) {
                            this.totalApprovedA4++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedA4f++
                        }
                    break;
                    case 'B':
                        this.totalApprovedB = this.totalApprovedB + 1;
                        this.totalAmountApprovedB = this.totalAmountApprovedB + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                        if(foodProductRequestDTO.requestStatusA) this.totalApprovedBf++

                        if(nFamily < 3) {
                            this.totalApprovedB2++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedB2f++
                        } else if(nFamily == 3) {
                            this.totalApprovedB3++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedB3f++
                        }  else if(nFamily > 3) {
                            this.totalApprovedB4++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedB4f++
                        }
                    break;
                    case 'C':
                        this.totalApprovedC = this.totalApprovedC + 1;
                        this.totalAmountApprovedC = this.totalAmountApprovedC + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                        if(foodProductRequestDTO.requestStatusA) this.totalApprovedCf++

                        if(nFamily < 3) {
                            this.totalApprovedC2++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedC2f++
                        } else if(nFamily == 3) {
                            this.totalApprovedC3++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedC3f++
                        }  else if(nFamily > 3) {
                            this.totalApprovedC4++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedC4f++
                        }
                    break;
                    case 'D':
                        this.totalApprovedD = this.totalApprovedD + 1;
                        this.totalAmountApprovedD = this.totalAmountApprovedD + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                        if(foodProductRequestDTO.requestStatusA) this.totalApprovedDf++

                        if(nFamily < 3) {
                            this.totalApprovedD2++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedD2f++
                        } else if(nFamily == 3) {
                            this.totalApprovedD3++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedD3f++
                        }  else if(nFamily > 3) {
                            this.totalApprovedD4++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedD4f++
                        }
                    break;
                    case 'E':
                        this.totalApprovedE = this.totalApprovedE + 1;
                        this.totalAmountApprovedE = this.totalAmountApprovedE + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                        if(foodProductRequestDTO.requestStatusA) this.totalApprovedEf++

                        if(nFamily < 3) {
                            this.totalApprovedE2++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedE2f++
                        } else if(nFamily == 3) {
                            this.totalApprovedE3++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedE3f++
                        }  else if(nFamily > 3) {
                            this.totalApprovedE4++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedE4f++
                        }
                    break;
                    case 'F':
                        this.totalApprovedF = this.totalApprovedF + 1;
                        this.totalAmountApprovedF = this.totalAmountApprovedF + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                        if(foodProductRequestDTO.requestStatusA) this.totalApprovedFf++

                        if(nFamily < 3) {
                            this.totalApprovedF2++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedF2f++
                        } else if(nFamily == 3) {
                            this.totalApprovedF3++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedF3f++
                        }  else if(nFamily > 3) {
                            this.totalApprovedF4++;
                            if(foodProductRequestDTO.requestStatusA) this.totalApprovedF4f++
                        }
                    break;
                }

                switch (foodProductRequestDTO.familyUnit.telephone) {
                    case 'A':
                        // Meno di 5000
                        this.totalMin5 = this.totalMin5 + 1;
                        this.totalAmountMin5 = this.totalAmountMin5 + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);       
                        
                        if(foodProductRequestDTO.requestStatusA) this.totalMin5f++

                        if(nFamily < 3) {
                            this.totalMin52++;
                            if(foodProductRequestDTO.requestStatusA) this.totalMin52f++
                        } else if(nFamily == 3) {
                            this.totalMin53++;
                            if(foodProductRequestDTO.requestStatusA) this.totalMin53f++
                        }  else if(nFamily > 3) {
                            this.totalMin54++;
                            if(foodProductRequestDTO.requestStatusA) this.totalMin54f++
                        }

                        switch (foodProductRequestDTO.familyUnit.postalCode) {
                            case 'A':
                                this.totalMin5A = this.totalMin5A + 1;
                                this.totalAmountMin5A = this.totalAmountMin5A + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMin5Af++

                                if(nFamily < 3) {
                                    this.totalMin5A2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5A2f++
                                } else if(nFamily == 3) {
                                    this.totalMin5A3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5A3f++
                                }  else if(nFamily > 3) {
                                    this.totalMin5A4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5A4f++
                                }
                            break;
                            case 'B':
                                this.totalMin5B = this.totalMin5B + 1;
                                this.totalAmountMin5B = this.totalAmountMin5B + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                                
                                if(foodProductRequestDTO.requestStatusA) this.totalMin5Bf++

                                if(nFamily < 3) {
                                    this.totalMin5B2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5B2f++
                                } else if(nFamily == 3) {
                                    this.totalMin5B3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5B3f++
                                }  else if(nFamily > 3) {
                                    this.totalMin5B4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5B4f++
                                }
                            break;
                            case 'C':
                                this.totalMin5C = this.totalMin5C + 1;
                                this.totalAmountMin5C = this.totalAmountMin5C + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMin5Cf++

                                if(nFamily < 3) {
                                    this.totalMin5C2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5C2f++
                                } else if(nFamily == 3) {
                                    this.totalMin5C3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5C3f++
                                }  else if(nFamily > 3) {
                                    this.totalMin5C4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5C4f++
                                }
                            break;
                            case 'D':
                                this.totalMin5D = this.totalMin5D + 1;
                                this.totalAmountMin5D = this.totalAmountMin5D + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);
                                
                                if(foodProductRequestDTO.requestStatusA) this.totalMin5Df++
                                
                                if(nFamily < 3) {
                                    this.totalMin5D2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5D2f++
                                } else if(nFamily == 3) {
                                    this.totalMin5D3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5D3f++
                                }  else if(nFamily > 3) {
                                    this.totalMin5D4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5D4f++
                                }
                            break;
                            case 'E':
                                this.totalMin5E = this.totalMin5E + 1;
                                this.totalAmountMin5E = this.totalAmountMin5E + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMin5Ef++

                                if(nFamily < 3) {
                                    this.totalMin5E2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5E2f++
                                } else if(nFamily == 3) {
                                    this.totalMin5E3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5E3f++
                                }  else if(nFamily > 3) {
                                    this.totalMin5E4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5E4f++
                                }
                            break;
                            case 'F':
                                this.totalMin5F = this.totalMin5F + 1;
                                this.totalAmountMin5F = this.totalAmountMin5F + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMin5Ff++

                                if(nFamily < 3) {
                                    this.totalMin5F2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5F2f++
                                } else if(nFamily == 3) {
                                    this.totalMin5F3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5F3f++
                                }  else if(nFamily > 3) {
                                    this.totalMin5F4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMin5F4f++
                                }
                            break;
                        }

                        break;
                    case 'B':
                        // Più di 5000
                        this.totalMor5 = this.totalMor5 + 1;
                        this.totalAmountMor5 = this.totalAmountMor5 + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);       

                        if(foodProductRequestDTO.requestStatusA) this.totalMor5f++

                        if(nFamily < 3) {
                            this.totalMor52++;
                            if(foodProductRequestDTO.requestStatusA) this.totalMor52f++
                        } else if(nFamily == 3) {
                            this.totalMor53++;
                            if(foodProductRequestDTO.requestStatusA) this.totalMor53f++
                        }  else if(nFamily > 3) {
                            this.totalMor54++;
                            if(foodProductRequestDTO.requestStatusA) this.totalMor54f++
                        }

                        switch (foodProductRequestDTO.familyUnit.postalCode) {
                            case 'A':
                                this.totalMor5A = this.totalMor5A + 1;
                                this.totalAmountMor5A = this.totalAmountMor5A + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMor5Af++

                                if(nFamily < 3) {
                                    this.totalMor5A2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5A2f++
                                } else if(nFamily == 3) {
                                    this.totalMor5A3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5A3f++
                                }  else if(nFamily > 3) {
                                    this.totalMor5A4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5A4f++
                                }
                            break;
                            case 'B':
                                this.totalMor5B = this.totalMor5B + 1;
                                this.totalAmountMor5B = this.totalAmountMor5B + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMor5Bf++

                                if(nFamily < 3) {
                                    this.totalMor5B2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5B2f++
                                } else if(nFamily == 3) {
                                    this.totalMor5B3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5B3f++
                                }  else if(nFamily > 3) {
                                    this.totalMor5B4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5B4f++
                                }
                            break;
                            case 'C':
                                this.totalMor5C = this.totalMor5C + 1;
                                this.totalAmountMor5C = this.totalAmountMor5C + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMor5Cf++

                                if(nFamily < 3) {
                                    this.totalMor5C2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5C2f++
                                } else if(nFamily == 3) {
                                    this.totalMor5C3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5C3f++
                                }  else if(nFamily > 3) {
                                    this.totalMor5C4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5C4f++
                                }
                            break;
                            case 'D':
                                this.totalMor5D = this.totalMor5D + 1;
                                this.totalAmountMor5D = this.totalAmountMor5D + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMor5Df++

                                if(nFamily < 3) {
                                    this.totalMor5D2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5D2f++
                                } else if(nFamily == 3) {
                                    this.totalMor5D3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5D3f++
                                }  else if(nFamily > 3) {
                                    this.totalMor5D4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5D4f++
                                }
                            break;
                            case 'E':
                                this.totalMor5E = this.totalMor5E + 1;
                                this.totalAmountMor5E = this.totalAmountMor5E + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMor5Ef++

                                if(nFamily < 3) {
                                    this.totalMor5E2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5E2f++
                                } else if(nFamily == 3) {
                                    this.totalMor5E3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5E3f++
                                }  else if(nFamily > 3) {
                                    this.totalMor5E4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5E4f++
                                }
                            break;
                            case 'F':
                                this.totalMor5F = this.totalMor5F + 1;
                                this.totalAmountMor5F = this.totalAmountMor5F + this.aigSolidarityRequestCalculatorService.calculate(foodProductRequestDTO);

                                if(foodProductRequestDTO.requestStatusA) this.totalMor5Ff++

                                if(nFamily < 3) {
                                    this.totalMor5F2++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5F2f++
                                } else if(nFamily == 3) {
                                    this.totalMor5F3++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5F3f++
                                }  else if(nFamily > 3) {
                                    this.totalMor5F4++;
                                    if(foodProductRequestDTO.requestStatusA) this.totalMor5F4f++
                                }
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
