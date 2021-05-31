import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { PriceListDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-price-list-box-detail',
    templateUrl: './price-list-box-detail.component.html',
    styleUrls: ['./price-list-box-detail.component.scss']
})
export class AigPriceListBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    priceListDTO: PriceListDTO;
}