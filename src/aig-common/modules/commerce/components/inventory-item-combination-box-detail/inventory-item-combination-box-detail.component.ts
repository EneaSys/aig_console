import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { InventoryItemCombinationDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-inventory-item-combination-box-detail',
    templateUrl: './inventory-item-combination-box-detail.component.html',
    styleUrls: ['./inventory-item-combination-box-detail.component.scss']
})
export class AigInventoryItemCombinationBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    inventoryItemCombination: InventoryItemCombinationDTO;

}