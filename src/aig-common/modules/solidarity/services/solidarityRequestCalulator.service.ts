import { Injectable } from '@angular/core';
import { FormDataDTO } from 'aig-generic';
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

    calculate3(foodProductRequestDTO: FoodProductRequestDTO) {
        let amount: number;
        {
            let familyComponents: number = foodProductRequestDTO.familyUnit.adultNumber + foodProductRequestDTO.familyUnit.childrenNumber;

            if(foodProductRequestDTO.familyUnit.city == "") {   // FASCIA A
                if(familyComponents < 3) {
                    amount = 200;
                } else if(familyComponents == 3 ) {
                    amount = 250;
                } else if(familyComponents > 3 ) {
                    amount = 300;
                }
            } else {                                            // FASCIA B
                if(familyComponents < 3) {
                    amount = 100;
                } else if(familyComponents == 3 ) {
                    amount = 150;
                } else if(familyComponents > 3 ) {
                    amount = 200;
                }
            }
        }
        
        //Affitto
        if (foodProductRequestDTO.requestStatusA) {
            //amount = amount + 50;
        }

        return amount;
    }

	calculate4(formDataDTO: FormDataDTO) {
		let amount: number = 0; 
		{
			let nComponent = formDataDTO.n1 + formDataDTO.n2;
			
			if(nComponent < 3) {
				amount += 200;
			}
			if(nComponent == 3) {
				amount += 250;
			}
			if(nComponent > 3) {
				amount += 300;
			}
		}

		if(formDataDTO.s10 == 'A') {
			amount += 50;
		}
		return amount;
	}

	getStatus4(status: number) {
		switch (status) {
			case 1:
				return {
					des: "Istruttoria in corso",
					color: "yellow"
				}
			case 2:
				return {
					des: "Soccorso istruttorio",
					color: "orange"
				}
			case 8:
				return {
					des: "Nulla",
					color: "violet"
				}
			case 9:
				return {
					des: "Rigettata",
					color: "red"
				}
			case 10:
				return {
					des: "Approvata",
					color: "green"
				}
			default:
				return {
					des: "Da istruire",
					color: "gray"
				}
		}

	}
}