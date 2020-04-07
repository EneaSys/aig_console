import { Injectable } from '@angular/core';
import { FoodProductRequestDTO } from 'aig-solidarety';

@Injectable()
export class AigSolidarityRequestCalculatorService {

    calculate(foodProductRequestDTO: FoodProductRequestDTO) {
        let familyComponents: number = foodProductRequestDTO.familyUnit.adultNumber + foodProductRequestDTO.familyUnit.childrenNumber;

        

        if(foodProductRequestDTO.requestStatusA) {
        
            if(familyComponents == 1 || familyComponents == 2) {
                return 250;
            }  
            else if(familyComponents == 3) {
                return 300;
            }
            else if(familyComponents > 3) {
                return 350;
            }
            
        }

        if(foodProductRequestDTO.requestStatusB) {
            if(foodProductRequestDTO.requestStatusBIncomeMar < 700) {
                
                if(familyComponents == 1 || familyComponents == 2) {
                    return 150;
                }  
                else if(familyComponents == 3) {
                    return 200;
                }
                else if(familyComponents > 3) {
                    return 250;
                }

            } else {

                if(familyComponents == 1 || familyComponents == 2) {
                    return 100;
                }  
                else if(familyComponents == 3) {
                    return 150;
                }
                else if(familyComponents > 3) {
                    return 200;
                }

            }
            
        }

        if(foodProductRequestDTO.requestStatusC) {
            if(familyComponents == 1 || familyComponents == 2) {
                return 100;
            }  
            else if(familyComponents == 3) {
                return 150;
            }
            else if(familyComponents > 3) {
                return 200;
            }
        }

    }
}