import { Injectable } from '@angular/core';
import { CatalogDTO, CatalogItemDTO, InventoryCategoryDTO, InventoryItemCombinationDTO, InventoryItemDTO, PriceListDTO, ProducerDTO, SellerDTO, WarehouseDTO } from 'aig-commerce';
import { BuyerDTO, PurchaseDTO, WarehouseHandlingItemDTO } from 'aig-commerce';
import { EopooDTO } from 'aig-generic';


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

    inventoryItemCombinationDisplayFn(inventoryItemCombination?: InventoryItemCombinationDTO): string | undefined {
        return inventoryItemCombination ? inventoryItemCombination.inventoryItem.name + " " + inventoryItemCombination.inventoryItem.producer.name + " " + inventoryItemCombination.name : undefined;
    }

    sellerDisplayFn(seller?: SellerDTO): string | undefined {
        return seller ? seller.name : undefined;
    }

    catalogDisplayFn(catalog?: CatalogDTO): string | undefined {
        return catalog ? catalog.name : undefined;
    }

    catalogItemDisplayFn(catalogItem?: CatalogItemDTO): string | undefined {
        return catalogItem ? catalogItem.inventoryItemCombination.inventoryItem.name + " - " + catalogItem.inventoryItemCombination.name : undefined;
    }

    priceListDisplayFn(priceList?: PriceListDTO): string | undefined {
        return priceList ? priceList.name : undefined;
    }

    purchaseDisplayFn(purchase?: PurchaseDTO): any | undefined {
        return purchase ? purchase.insertedDateTime : undefined;
    }

    warehouseHandlingItemDisplayFn(warehouseHandlingItem?: WarehouseHandlingItemDTO): any | undefined {
        return warehouseHandlingItem ? warehouseHandlingItem : undefined;
    }

    eopooDisplayFn(eopoo?: EopooDTO): any | undefined {
        return eopoo ? eopoo.person : undefined;
    }
}