import { Injectable } from '@angular/core';
import { CatalogDTO, InventoryCategoryDTO, InventoryItemDTO, ProducerDTO, SellerDTO } from 'aig-commerce';

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

    inventoryItemDisplayFn(inventoryItem?: InventoryItemDTO): string | undefined {
        return inventoryItem ? inventoryItem.name : undefined;
    }

    sellerDisplayFn(seller?: SellerDTO): string | undefined {
        return seller ? seller.name : undefined;
    }

    catalogDisplayFn(catalog?: CatalogDTO): string | undefined {
        return catalog ? catalog.name : undefined;
    }
}