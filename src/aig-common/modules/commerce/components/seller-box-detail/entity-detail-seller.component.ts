import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SellerDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'entity-detail-seller',
    templateUrl: './entity-detail-seller.component.html',
    styleUrls: ['./entity-detail-seller.component.scss']
})
export class AigEntityDetailSellerComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    seller: SellerDTO;

}