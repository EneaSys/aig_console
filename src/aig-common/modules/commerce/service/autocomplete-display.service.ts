import { Injectable } from '@angular/core';
import { BuyerDTO, InventoryCategoryDTO, InventoryItemCombinationDTO, InventoryItemDTO, ProducerDTO, PurchaseDTO, SellerDTO, WarehouseDTO, WarehouseHandlingItemDTO } from 'aig-commerce';


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
        
    warehouseDisplayFn(warehouse?: WarehouseDTO): string | undefined {
        return warehouse ? warehouse.name : undefined;
    }
    
    inventoryItemDisplayFn(inventoryItem?: InventoryItemDTO): string | undefined {
        return inventoryItem ? inventoryItem.name : undefined;
    }

    sellerDisplayFn(seller?: SellerDTO): string | undefined {
        return seller ? seller.name : undefined;
    }

    purchaseDisplayFn(purchase?: PurchaseDTO): any | undefined {
        return purchase ? purchase.insertedDateTime : undefined;
    }

    inventoryItemCombinationDisplayFn(inventoryItemCombination?: InventoryItemCombinationDTO): string | undefined {
        return inventoryItemCombination ? inventoryItemCombination.inventoryItem.producer.name + inventoryItemCombination.inventoryItem.name + inventoryItemCombination.name : undefined;
    }

    warehouseHandlingItemDisplayFn(warehouseHandlingItem?: WarehouseHandlingItemDTO): any | undefined {
        return warehouseHandlingItem ? warehouseHandlingItem : undefined;
    }
}