import { Injectable } from '@angular/core';
import { BuyerDTO, InventoryCategoryDTO, ProducerDTO } from 'aig-commerce';

@Injectable({
	providedIn: 'root'
})
export class AigAutocompleteDisplayService {
	producerDisplayFn(producer?: ProducerDTO): string | undefined {
        return producer ? producer.name : undefined;
    }

	inventoryCategoryDisplayFn(inventoryCategory?: InventoryCategoryDTO): string | undefined {
        return inventoryCategory ? inventoryCategory.name : undefined;
    }

    buyerDisplayFn(buyer?: BuyerDTO): number | undefined {
        return buyer ? buyer.id : undefined;
    }
}