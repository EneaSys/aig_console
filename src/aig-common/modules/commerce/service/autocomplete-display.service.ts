import { Injectable } from '@angular/core';
import { InventoryCategoryDTO, ProducerDTO, WarehouseDTO } from 'aig-commerce';

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
}