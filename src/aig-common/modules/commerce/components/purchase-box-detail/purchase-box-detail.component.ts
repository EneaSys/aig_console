import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { PurchaseDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-purchase-box-detail',
    templateUrl: './purchase-box-detail.component.html',
    styleUrls: ['./purchase-box-detail.component.scss']
})
export class AigPurchaseBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    purchase: PurchaseDTO;

}