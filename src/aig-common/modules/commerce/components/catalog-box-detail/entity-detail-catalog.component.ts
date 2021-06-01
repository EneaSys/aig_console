import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { CatalogDTO } from 'aig-commerce';
import { AigCommerceCommonGenericComponent } from '../commerce-common-generic-component';

@Component({
    selector: 'entity-detail-catalog',
    templateUrl: './entity-detail-catalog.component.html',
    styleUrls: ['./entity-detail-catalog.component.scss']
})
export class AigEntityDetailCatalogComponent extends AigCommerceCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    catalog: CatalogDTO;
}