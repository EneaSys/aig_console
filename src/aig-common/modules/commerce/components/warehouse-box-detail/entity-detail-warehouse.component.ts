import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { WarehouseDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'entity-detail-warehouse',
    templateUrl: './entity-detail-warehouse.component.html',
    styleUrls: ['./entity-detail-warehouse.component.scss']
})
export class AigEntityDetailWarehouseComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }

    ngOnInit(): void {}

    @Input()
    warehouse: WarehouseDTO;
}