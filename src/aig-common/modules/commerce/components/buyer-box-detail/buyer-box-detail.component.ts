import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { BuyerDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-buyer-box-detail',
    templateUrl: './buyer-box-detail.component.html',
    styleUrls: ['./buyer-box-detail.component.scss']
})
export class AigBuyerBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    buyerDTO: BuyerDTO;
}