import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { WarehouseHandlingDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'aig-warehouse-handling-box-detail',
    templateUrl: './warehouse-handling-box-detail.component.html',
    styleUrls: ['./warehouse-handling-box-detail.component.scss']
})
export class AigWarehouseHandlingBoxDetailComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }

    ngOnInit(): void {}

    @Input()
    warehouseHandlingDTO: WarehouseHandlingDTO;
}