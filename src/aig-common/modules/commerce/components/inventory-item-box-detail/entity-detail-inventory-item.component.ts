import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { InventoryItemDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'entity-detail-inventory-item',
    templateUrl: './entity-detail-inventory-item.component.html',
    styleUrls: ['./entity-detail-inventory-item.component.scss']
})
export class AigEntityDetailInventoryItemComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    inventoryItemDTO: InventoryItemDTO;
}