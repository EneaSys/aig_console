import { Injectable } from '@angular/core';
import { BuyerDTO, InventoryCategoryDTO, InventoryItemDTO, ProducerDTO } from 'aig-commerce';

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
        
    inventoryItemDisplayFn(inventoryItem?: InventoryItemDTO): string | undefined {
        return inventoryItem ? inventoryItem.name : undefined;
    }
}