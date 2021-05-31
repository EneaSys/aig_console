import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { InventoryCategoryDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-inventory-category-box-detail',
    templateUrl: './inventory-category-box-detail.component.html',
    styleUrls: ['./inventory-category-box-detail.component.scss']
})
export class AigInventoryCategoryBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    inventoryCategory: InventoryCategoryDTO;
}