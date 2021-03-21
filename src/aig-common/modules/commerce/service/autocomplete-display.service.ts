import { Injectable } from '@angular/core';
import { InventoryCategoryDTO, InventoryItemCombinationDTO, InventoryItemDTO, ProducerDTO, SellerDTO, WarehouseDTO } from 'aig-commerce';


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

    warehouseDisplayFn(warehouse?: WarehouseDTO): string | undefined {
        return warehouse ? warehouse.name : undefined;
    }
    
    inventoryItemDisplayFn(inventoryItem?: InventoryItemDTO): string | undefined {
        return inventoryItem ? inventoryItem.name : undefined;
    }

    inventoryItemCombinationDisplayFn(inventoryItemCombination?: InventoryItemCombinationDTO): string | undefined {
        return inventoryItemCombination ? inventoryItemCombination.inventoryItem.name + " " + inventoryItemCombination.inventoryItem.producer.name + " " + inventoryItemCombination.name : undefined;
    }

    sellerDisplayFn(seller?: SellerDTO): string | undefined {
        return seller ? seller.name : undefined;
    }
}