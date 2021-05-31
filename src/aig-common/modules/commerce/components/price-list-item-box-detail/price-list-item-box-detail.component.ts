import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { PriceListItemDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-price-list-item-box-detail',
    templateUrl: './price-list-item-box-detail.component.html',
    styleUrls: ['./price-list-item-box-detail.component.scss']
})
export class AigPriceListItemBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    priceListItemDTO: PriceListItemDTO;
}