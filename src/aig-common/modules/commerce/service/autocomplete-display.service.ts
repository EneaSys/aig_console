import { Injectable } from '@angular/core';
import { InventoryCategoryDTO, ProducerDTO, SellerDTO, WarehouseDTO } from 'aig-commerce';

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

    sellerDisplayFn(seller?: SellerDTO): string | undefined {
        return seller ? seller.name : undefined;
    }
}