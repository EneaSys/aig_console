import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { CatalogItemDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-catalog-item-box-detail',
    templateUrl: './catalog-item-box-detail.component.html',
    styleUrls: ['./catalog-item-box-detail.component.scss']
})
export class AigCatalogItemBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    catalogItem: CatalogItemDTO;
}