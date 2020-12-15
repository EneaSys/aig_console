import { Injectable } from '@angular/core';
import { FoodProductRequestDTO } from 'aig-solidarety';

@Injectable()
export class AigSolidarityRequestCalculatorService {

    calculate(foodProductRequestDTO: FoodProductRequestDTO) {
        let amount: number;
        {
            let familyComponents: number = foodProductRequestDTO.familyUnit.adultNumber + foodProductRequestDTO.familyUnit.childrenNumber;

            switch (foodProductRequestDTO.familyUnit.telephone) {
                case 'A': 
                    // Meno di 5000
                    switch (foodProductRequestDTO.familyUnit.postalCode) {
                        case 'A':
                            // Facia A
                            if(familyComponents < 3) {
                                amount = 200;
                            } else if(familyComponents == 3 ) {
                                amount = 250;
                            } else if(familyComponents > 3 ) {
                                amount = 300;
                            }
                            break;
                        default:
                            // Facia tutte le altre
                            if(familyComponents < 3) {
                                amount = 100;
                            } else if(familyComponents == 3 ) {
                                amount = 150;
                            } else if(familyComponents > 3 ) {
                                amount = 200;
                            }
                            break;
                    }
                    break;
                case 'B': 
                    // Tra 5000 e 15000
                    switch (foodProductRequestDTO.familyUnit.postalCode) {
                        case 'A':
                            // Facia A
                            if(familyComponents < 3) {
                                amount = 160;
                            } else if(familyComponents == 3 ) {
                                amount = 200;
                            } else if(familyComponents > 3 ) {
                                amount = 240;
                            }
                            break;
                        default:
                            // Facia tutte le altre
                            if(familyComponents < 3) {
                                amount = 100;
                            } else if(familyComponents == 3 ) {
                                amount = 120;
                            } else if(familyComponents > 3 ) {
                                amount = 160;
                            }
                            break;
                    }
                    break;
                default:
                    amount = -500;
                    break;
            }
        }
        
        //Affitto
        if (foodProductRequestDTO.requestStatusA) {
            amount = amount + 50;
        }

        return amount;
    }
}